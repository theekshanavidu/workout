package com.theekshana.workoutsuite;

import android.annotation.SuppressLint;
import android.graphics.Bitmap;
import android.os.Bundle;
import android.view.View;
import android.webkit.WebChromeClient;
import android.webkit.WebResourceError;
import android.webkit.WebResourceRequest;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.ProgressBar;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

public class MainActivity extends AppCompatActivity {

    private WebView webView;
    private ProgressBar progressBar;

    // Target URL: Hosted GitHub Pages URL (or local server during debugging)
    private static final String APP_URL = "https://theekshanavidu.github.io/workout/";

    @SuppressLint("SetJavaScriptEnabled")
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        webView = findViewById(R.id.webview);
        progressBar = findViewById(R.id.progressBar);

        // Configure Advanced WebView Settings with Deep Device Caching
        WebSettings webSettings = webView.getSettings();
        webSettings.setJavaScriptEnabled(true);
        webSettings.setDomStorageEnabled(true); // Enables LocalStorage, SessionStorage & CacheStorage
        webSettings.setDatabaseEnabled(true);   // Enables IndexedDB persistence for 3D GIFs & logs
        webSettings.setCacheMode(WebSettings.LOAD_DEFAULT); // Prefers cached assets on device
        webSettings.setAllowFileAccess(true);
        webSettings.setAllowContentAccess(true);
        webSettings.setMediaPlaybackRequiresUserGesture(false);
        webSettings.setUseWideViewPort(true);
        webSettings.setLoadWithOverviewMode(true);
        webSettings.setSupportZoom(false);

        // Enable Service Worker caching for Android Nougat (API 24) and above
        if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.N) {
            try {
                android.webkit.ServiceWorkerController swController = android.webkit.ServiceWorkerController.getInstance();
                swController.getServiceWorkerWebSettings().setAllowContentAccess(true);
                swController.getServiceWorkerWebSettings().setCacheMode(WebSettings.LOAD_DEFAULT);
            } catch (Exception e) {
                // Fallback for custom ROMs
            }
        }

        // Performance & Hardware Acceleration
        webView.setScrollBarStyle(View.SCROLLBARS_INSIDE_OVERLAY);
        webView.setLayerType(View.LAYER_TYPE_HARDWARE, null);


        // Handle page navigation within WebView
        webView.setWebViewClient(new WebViewClient() {
            @Override
            public void onPageStarted(WebView view, String url, Bitmap favicon) {
                super.onPageStarted(view, url, favicon);
                if (progressBar != null) progressBar.setVisibility(View.VISIBLE);
            }

            @Override
            public void onPageFinished(WebView view, String url) {
                super.onPageFinished(view, url);
                if (progressBar != null) progressBar.setVisibility(View.GONE);
            }

            @Override
            public void onReceivedError(WebView view, WebResourceRequest request, WebResourceError error) {
                super.onReceivedError(view, request, error);
                if (request.isForMainFrame()) {
                    Toast.makeText(MainActivity.this, "Connecting to Workout Suite...", Toast.LENGTH_SHORT).show();
                }
            }
        });

        // Handle WebChromeClient (Console / UI)
        webView.setWebChromeClient(new WebChromeClient() {
            @Override
            public void onProgressChanged(WebView view, int newProgress) {
                if (progressBar != null) {
                    progressBar.setProgress(newProgress);
                    if (newProgress == 100) progressBar.setVisibility(View.GONE);
                }
            }
        });

        // Load the application
        webView.loadUrl(APP_URL);
    }

    @Override
    public void onBackPressed() {
        if (webView != null && webView.canGoBack()) {
            webView.goBack();
        } else {
            super.onBackPressed();
        }
    }
}
