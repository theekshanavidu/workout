// ============================================================================
// THEEKSHANA // 3D WORKOUT SUITE & PROGRESS TRACKER
// Direct WorkoutX API 3D Visuals (wx_...4193) + Firebase Firestore + LocalStorage
// ============================================================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// ----------------------------------------------------------------------------
// 1. CONFIGURATIONS & WORKOUTX API INTEGRATION (Exclusively from .env)
// ----------------------------------------------------------------------------
const env = (typeof window !== "undefined" && window.__ENV__) || {};

// Loaded exclusively from .env (no hardcoded keys)
const WORKOUTX_API_KEY = env.WORKOUTX_API_KEY || "";

const firebaseConfig = {
  apiKey: env.FIREBASE_API_KEY || "",
  authDomain: env.FIREBASE_AUTH_DOMAIN || "",
  projectId: env.FIREBASE_PROJECT_ID || "",
  storageBucket: env.FIREBASE_STORAGE_BUCKET || "",
  messagingSenderId: env.FIREBASE_MESSAGING_SENDER_ID || "",
  appId: env.FIREBASE_APP_ID || "",
  measurementId: env.FIREBASE_MEASUREMENT_ID || ""
};

// Initialize Firebase only if valid environment keys are provided
let db = null;
let firebaseInitialized = false;

if (firebaseConfig.apiKey && firebaseConfig.projectId) {
  try {
    const firebaseApp = initializeApp(firebaseConfig);
    db = getFirestore(firebaseApp);
    firebaseInitialized = true;
    console.log("Firebase Firestore connected via .env configuration.");
  } catch (err) {
    console.warn("Firebase initialization warning (continuing with LocalStorage):", err);
  }
} else {
  console.log("Firebase keys not configured in .env. Operating in LocalStorage mode.");
}

// ----------------------------------------------------------------------------
// 2. COMPLETE WORKOUT ROUTINE DATASET WITH WORKOUTX API IDs
// ----------------------------------------------------------------------------
const workoutPlan = {
  1: {
    id: 1,
    title: "Day 1 - Upper Body (Monday)",
    shortName: "Upper Body",
    duration: "1 HR 30 MIN",
    badgeColor: "cyan",
    notes: "Focus on mind-muscle connection. Tuesdays are rest days. Maintain 3.5L water & 130g-140g protein daily.",
    sections: [
      {
        category: "Warm-Up",
        items: [
          {
            id: "d1_w1",
            workoutXId: "0178",
            name: "Dynamic Shoulder Dislocations & Chest Stretch",
            sets: 2,
            targetReps: "15-20",
            rest: "30s",
            restSecs: 30,
            target: "Rotator Cuff & Chest Elasticity",
            demo: "https://fitnessprogramer.com/wp-content/uploads/2021/07/Band-Dislocation.gif",
            defaultWeight: 0,
            cues: "Keep arms straight and core braced. Controlled circular motion without hyperextending lower back."
          },
          {
            id: "d1_w2",
            workoutXId: "0258",
            name: "Light Push-ups & Band Pull-Aparts",
            sets: 2,
            targetReps: "12-15",
            rest: "30s",
            restSecs: 30,
            target: "Pectorals, Scapular Activation",
            demo: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Push-Up.gif",
            defaultWeight: 0,
            cues: "Squeeze shoulder blades together at top. Warm up the upper body joint capsule."
          }
        ]
      },
      {
        category: "Main Workout",
        items: [
          {
            id: "d1_m1",
            workoutXId: "1299",
            name: "Incline ISO Chest Press Machine",
            sets: 4,
            targetReps: "8-8-10-10",
            rest: "60-75s",
            restSecs: 75,
            target: "Clavicular Pectoralis (Upper Chest)",
            demo: "https://fitnessprogramer.com/wp-content/uploads/2021/06/Incline-Chest-Press-Machine.gif",
            defaultWeight: 50,
            cues: "Retract scapulae against seat pad. Push convergently with full squeeze at peak contraction."
          },
          {
            id: "d1_m2",
            workoutXId: "0025",
            name: "Flat Barbell Bench Press",
            sets: 3,
            targetReps: "8-8-8",
            rest: "60-75s",
            restSecs: 75,
            target: "Sternal Pectoralis & Anterior Deltoid",
            demo: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Barbell-Bench-Press.gif",
            defaultWeight: 60,
            cues: "Firm leg drive. Touch lower chest smoothly and press with elbow flare under 70 degrees."
          },
          {
            id: "d1_m3",
            workoutXId: "1349",
            name: "Chest Supported T-Bar Row",
            sets: 4,
            targetReps: "8-8-10-10",
            rest: "60-75s",
            restSecs: 75,
            target: "Rhomboids, Middle Trapezius",
            demo: "https://fitnessprogramer.com/wp-content/uploads/2021/04/Lever-T-bar-Row.gif",
            defaultWeight: 45,
            cues: "Keep chest pinned to the support pad. Pull with elbows and pinch mid-back for 1 full second."
          },
          {
            id: "d1_m4",
            workoutXId: "0198",
            name: "Wide-Grip Lat Pulldown",
            sets: 4,
            targetReps: "8-8-10-10",
            rest: "60s",
            restSecs: 60,
            target: "Latissimus Dorsi Width",
            demo: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Lat-Pulldown.gif",
            defaultWeight: 45,
            cues: "Slight lean back. Pull bar towards upper sternum driving elbows down toward hip pockets."
          },
          {
            id: "d1_m5",
            workoutXId: "0603",
            name: "Shoulder Press Machine",
            sets: 3,
            targetReps: "8-10-10",
            rest: "60s",
            restSecs: 60,
            target: "Anterior Deltoids & Triceps",
            demo: "https://fitnessprogramer.com/wp-content/uploads/2021/04/Lever-Shoulder-Press.gif",
            defaultWeight: 35,
            cues: "Keep wrists stacked directly over forearms. Press without locking out elbow joints harshly."
          },
          {
            id: "d1_m6",
            workoutXId: "0334",
            name: "Dumbbell Side Lateral Raises",
            sets: 3,
            targetReps: "12-12-15",
            rest: "60s",
            restSecs: 60,
            target: "Lateral Deltoid Isolation",
            demo: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Lateral-Raise.gif",
            defaultWeight: 10,
            cues: "Lead with elbows. Slight forward hinge at torso to align with lateral deltoid muscle fibers."
          },
          {
            id: "d1_m7",
            workoutXId: "0031",
            name: "Standing Barbell Biceps Curl",
            sets: 3,
            targetReps: "10-10-10",
            rest: "60s",
            restSecs: 60,
            target: "Biceps Brachii",
            demo: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Barbell-Curl.gif",
            defaultWeight: 25,
            cues: "Pin elbows at your sides. Avoid swinging lower back to initiate the concentric phase."
          },
          {
            id: "d1_m8",
            workoutXId: "0200",
            name: "Triceps Bar / Rope Pushdown",
            sets: 3,
            targetReps: "12-12-12",
            rest: "60s",
            restSecs: 60,
            target: "Triceps Lateral & Medial Heads",
            demo: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Pushdown.gif",
            defaultWeight: 25,
            cues: "Standing upright, extend down fully and spread rope handles outward at bottom for peak triceps contraction."
          },
          {
            id: "d1_m9",
            workoutXId: "0277",
            name: "Decline Crunch",
            sets: 3,
            targetReps: "15-15-15",
            rest: "45s",
            restSecs: 45,
            target: "Upper Rectus Abdominis",
            demo: "https://fitnessprogramer.com/wp-content/uploads/2021/09/Decline-Crunch.gif",
            defaultWeight: 0,
            cues: "Roll ribcage toward pelvis. Do not yank on neck."
          },
          {
            id: "d1_m10",
            workoutXId: "0175",
            name: "Knee Up Crunch",
            sets: 3,
            targetReps: "15-15-15",
            rest: "45s",
            restSecs: 45,
            target: "Core & Abdominals",
            demo: "https://fitnessprogramer.com/wp-content/uploads/2021/07/Crunch.gif",
            defaultWeight: 0,
            cues: "Exhale sharply on crunch, holding static tension on abdominal wall."
          }
        ]
      },
      {
        category: "Cardio & Recovery",
        items: [
          {
            id: "d1_c1",
            workoutXId: "0798",
            name: "Stationary Cycling (Moderate Pace)",
            sets: 1,
            targetReps: "12-15 min",
            rest: "N/A",
            restSecs: 0,
            target: "Cardiovascular System / Fat Burn",
            demo: "https://fitnessprogramer.com/wp-content/uploads/2021/06/Stationary-Bike.gif",
            defaultWeight: 0,
            cues: "Steady heart rate in Zone 2 aerobic threshold for active recovery."
          },
          {
            id: "d1_c2",
            workoutXId: "0178",
            name: "Static Upper Body Mobility Stretch",
            sets: 1,
            targetReps: "20-30s per stretch",
            rest: "N/A",
            restSecs: 0,
            target: "Recovery & Muscle Length",
            demo: "https://fitnessprogramer.com/wp-content/uploads/2021/07/Band-Dislocation.gif",
            defaultWeight: 0,
            cues: "Relax breath into static holds to reset resting muscle tension."
          }
        ]
      }
    ]
  },
  2: {
    id: 2,
    title: "Day 2 - Leg Day (Wednesday)",
    shortName: "Leg Day",
    duration: "1 HR 30 MIN",
    badgeColor: "amber",
    notes: "Push through heels on Leg Press. Keep spine neutral during Romanian Deadlifts. Thursday is Rest Day.",
    sections: [
      {
        category: "Warm-Up",
        items: [
          {
            id: "d2_w1",
            workoutXId: "3167",
            name: "Dynamic Hip Openers & Leg Swings",
            sets: 2,
            targetReps: "15-20",
            rest: "30s",
            restSecs: 30,
            target: "Hip Capsule Mobility",
            demo: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Bodyweight-Squat.gif",
            defaultWeight: 0,
            cues: "Loosen femoral head inside acetabulum before heavy axial loading."
          },
          {
            id: "d2_w2",
            workoutXId: "3167",
            name: "Bodyweight Squats & Walking Lunges",
            sets: 2,
            targetReps: "15-15",
            rest: "30s",
            restSecs: 30,
            target: "Quad, Glute & Knee Activation",
            demo: "https://fitnessprogramer.com/wp-content/uploads/2021/06/Walking-Lunges.gif",
            defaultWeight: 0,
            cues: "Warm synovial fluid in knee and patellar tendons."
          }
        ]
      },
      {
        category: "Main Workout",
        items: [
          {
            id: "d2_m1",
            workoutXId: "0739",
            name: "45° Leg Press",
            sets: 4,
            targetReps: "8-8-8-8",
            rest: "75-90s",
            restSecs: 90,
            target: "Quadriceps & Gluteal Maxima",
            demo: "https://fitnessprogramer.com/wp-content/uploads/2021/05/Leg-Press.gif",
            defaultWeight: 140,
            cues: "Place feet shoulder-width on platform. Control depth without allowing lumbar spine to lift off pad."
          },
          {
            id: "d2_m2",
            workoutXId: "0743",
            name: "V-Squat (Machine Hack Squat)",
            sets: 4,
            targetReps: "8-8-8-8",
            rest: "75-90s",
            restSecs: 90,
            target: "Quads & Posterior Chain",
            demo: "https://fitnessprogramer.com/wp-content/uploads/2021/05/Leg-Press.gif",
            defaultWeight: 70,
            cues: "Machine guided squat. Maintain upright torso, descend smoothly until parallel, and drive up through heels."
          },
          {
            id: "d2_m3",
            workoutXId: "1459",
            name: "Romanian Deadlifts (RDL - Dumbbells)",
            sets: 4,
            targetReps: "8-10-10-10",
            rest: "60-75s",
            restSecs: 75,
            target: "Hamstrings, Glutes & Erector Spinae",
            demo: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Romanian-Deadlift.gif",
            defaultWeight: 22,
            cues: "Holding dumbbells, push hips backwards like closing a car door behind you. Maintain neutral spine and deep hamstring stretch."
          },
          {
            id: "d2_m4",
            workoutXId: "0585",
            name: "Leg Extension",
            sets: 3,
            targetReps: "12-12-12",
            rest: "60s",
            restSecs: 60,
            target: "Quadriceps Isolation (Rectus Femoris)",
            demo: "https://fitnessprogramer.com/wp-content/uploads/2021/02/LEG-EXTENSION.gif",
            defaultWeight: 45,
            cues: "Pause for 1 second at top contraction. Control the negative descent over 2-3 seconds."
          },
          {
            id: "d2_m5",
            workoutXId: "0586",
            name: "Lying Leg Curl (Lever Machine)",
            sets: 3,
            targetReps: "10-10-12",
            rest: "60s",
            restSecs: 60,
            target: "Hamstrings (Biceps Femoris)",
            demo: "https://fitnessprogramer.com/wp-content/uploads/2021/08/Lying-Leg-Curl.gif",
            defaultWeight: 35,
            cues: "Lie face down on machine with padded lever behind ankles. Curl weight up smoothly toward glutes."
          },
          {
            id: "d2_m6",
            workoutXId: "0088",
            name: "Seated Calf Raises",
            sets: 4,
            targetReps: "15-15-15-15",
            rest: "45-60s",
            restSecs: 60,
            target: "Soleus Calf Muscle",
            demo: "https://fitnessprogramer.com/wp-content/uploads/2021/06/Lever-Seated-Calf-Raise.gif",
            defaultWeight: 30,
            cues: "Achieve deep stretch at bottom followed by strong dorsiflexion lockout at peak."
          },
          {
            id: "d2_m7",
            workoutXId: "0108",
            name: "Standing Calf Raise Machine",
            sets: 4,
            targetReps: "12-12-15-15",
            rest: "45-60s",
            restSecs: 60,
            target: "Gastrocnemius (Calf Peak)",
            demo: "https://fitnessprogramer.com/wp-content/uploads/2021/04/Lever-Standing-Calf-Raise.gif",
            defaultWeight: 60,
            cues: "Straight knee angle engages gastrocnemius peak. Slow tempo without bouncing."
          },
          {
            id: "d2_m8",
            workoutXId: "0010",
            name: "Hanging Knee Raises",
            sets: 3,
            targetReps: "12-15-15",
            rest: "45s",
            restSecs: 45,
            target: "Lower Rectus Abdominis & Hip Flexors",
            demo: "https://fitnessprogramer.com/wp-content/uploads/2021/08/Hanging-Knee-Raise.gif",
            defaultWeight: 0,
            cues: "Curl pelvis upward towards chest. Avoid swinging body like a pendulum."
          },
          {
            id: "d2_m9",
            workoutXId: "0464",
            name: "Plank Hold",
            sets: 3,
            targetReps: "45-60 sec",
            rest: "45s",
            restSecs: 45,
            target: "Core Isometric Stability",
            demo: "https://fitnessprogramer.com/wp-content/uploads/2021/02/plank.gif",
            defaultWeight: 0,
            cues: "Brace glutes and abdominals as if preparing to take a punch."
          }
        ]
      },
      {
        category: "Cardio & Recovery",
        items: [
          {
            id: "d2_c1",
            workoutXId: "3666",
            name: "Treadmill Incline Brisk Walk",
            sets: 1,
            targetReps: "10-12 min",
            rest: "N/A",
            restSecs: 0,
            target: "Aerobic Recovery / Caloric Burn",
            demo: "https://fitnessprogramer.com/wp-content/uploads/2021/06/Treadmill.gif",
            defaultWeight: 0,
            cues: "10% incline at 5.0 km/h brisk walk to clear lactic acid."
          },
          {
            id: "d2_c2",
            workoutXId: "3167",
            name: "Static Lower Body Muscle Stretch",
            sets: 1,
            targetReps: "20-30s per stretch",
            rest: "N/A",
            restSecs: 0,
            target: "Lower Body Recovery",
            demo: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Bodyweight-Squat.gif",
            defaultWeight: 0,
            cues: "Hamstring and hip flexor static stretches to prevent tightness."
          }
        ]
      }
    ]
  },
  3: {
    id: 3,
    title: "Day 3 - Full Body & Conditioning (Friday)",
    shortName: "Full Body",
    duration: "1 HR 30 MIN",
    badgeColor: "emerald",
    notes: "Keep protein intake high (130g-140g). Saturday & Sunday are complete rest & rebuilding days.",
    sections: [
      {
        category: "Warm-Up",
        items: [
          {
            id: "d3_w1",
            workoutXId: "0178",
            name: "Full Body Dynamic Mobility & Arm Circles",
            sets: 2,
            targetReps: "15-20",
            rest: "30s",
            restSecs: 30,
            target: "Systemic Joint Warm-up",
            demo: "https://fitnessprogramer.com/wp-content/uploads/2021/07/Band-Dislocation.gif",
            defaultWeight: 0,
            cues: "Smooth full-body rotation to activate nervous system."
          },
          {
            id: "d3_w2",
            workoutXId: "0003",
            name: "Jumping Jacks (Light Warm-up)",
            sets: 2,
            targetReps: "20-20",
            rest: "30s",
            restSecs: 30,
            target: "CNS Activation & Heart Rate",
            demo: "https://fitnessprogramer.com/wp-content/uploads/2021/05/Jumping-Jack.gif",
            defaultWeight: 0,
            cues: "Elevate core body temperature before heavy compound lifting."
          }
        ]
      },
      {
        category: "Main Workout",
        items: [
          {
            id: "d3_m1",
            workoutXId: "0739",
            name: "45° Leg Press (or Goblet Squat)",
            sets: 3,
            targetReps: "8-10-10",
            rest: "60-75s",
            restSecs: 75,
            target: "Lower Body Compound Power",
            demo: "https://fitnessprogramer.com/wp-content/uploads/2021/05/Leg-Press.gif",
            defaultWeight: 130,
            cues: "Solid foot plant. Drive through heels without knee caving."
          },
          {
            id: "d3_m2",
            workoutXId: "1299",
            name: "Incline ISO Chest Press Machine",
            sets: 3,
            targetReps: "8-8-10",
            rest: "60-75s",
            restSecs: 75,
            target: "Upper Pectorals",
            demo: "https://fitnessprogramer.com/wp-content/uploads/2021/06/Incline-Chest-Press-Machine.gif",
            defaultWeight: 55,
            cues: "Controlled eccentric stretch on upper chest fibers."
          },
          {
            id: "d3_m3",
            workoutXId: "0861",
            name: "Seated Cable Row",
            sets: 3,
            targetReps: "8-10-10",
            rest: "60s",
            restSecs: 60,
            target: "Lat Width & Back Thickness",
            demo: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Seated-Cable-Row.gif",
            defaultWeight: 50,
            cues: "Seated with upright posture, pull cable handle into abdomen and squeeze shoulder blades."
          },
          {
            id: "d3_m4",
            workoutXId: "5203",
            name: "Cable Face Pulls (Rear Delts & Posture)",
            sets: 3,
            targetReps: "12-12-15",
            rest: "60s",
            restSecs: 60,
            target: "Posterior Deltoids & Infraspinatus",
            demo: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Face-Pull.gif",
            defaultWeight: 20,
            cues: "Pull rope directly toward eye level with thumbs facing backward. Essential for shoulder longevity."
          },
          {
            id: "d3_m5",
            workoutXId: "0334",
            name: "Dumbbell Side Lateral Raises",
            sets: 3,
            targetReps: "12-12-15",
            rest: "60s",
            restSecs: 60,
            target: "Shoulder Breadth",
            demo: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Lateral-Raise.gif",
            defaultWeight: 10,
            cues: "Isolate lateral head with dumbbells. Do not jerk torso or shrug trapezius."
          },
          {
            id: "d3_m6",
            workoutXId: "0313",
            name: "Dumbbell Hammer Curls",
            sets: 3,
            targetReps: "10-10-12",
            rest: "60s",
            restSecs: 60,
            target: "Brachialis & Forearm Extensors",
            demo: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Hammer-Curl.gif",
            defaultWeight: 14,
            cues: "Neutral dumbbell grip with thumbs pointing up. Builds arm thickness and forearm stability."
          },
          {
            id: "d3_m7",
            workoutXId: "0018",
            name: "Overhead Dumbbell Triceps Extension",
            sets: 3,
            targetReps: "10-10-12",
            rest: "60s",
            restSecs: 60,
            target: "Triceps Long Head",
            demo: "https://fitnessprogramer.com/wp-content/uploads/2021/04/Dumbbell-Triceps-Extension.gif",
            defaultWeight: 18,
            cues: "Deep elbow flexion behind head for maximum stretch on long triceps head."
          },
          {
            id: "d3_m8",
            workoutXId: "0277",
            name: "Decline Crunch",
            sets: 3,
            targetReps: "15-15-15",
            rest: "45s",
            restSecs: 45,
            target: "Abdominals",
            demo: "https://fitnessprogramer.com/wp-content/uploads/2021/09/Decline-Crunch.gif",
            defaultWeight: 0,
            cues: "Controlled curl upward, tension maintained continuously."
          },
          {
            id: "d3_m9",
            workoutXId: "0012",
            name: "Lying Leg Raises",
            sets: 3,
            targetReps: "15-15-15",
            rest: "45s",
            restSecs: 45,
            target: "Lower Abs & Hip Flexors",
            demo: "https://fitnessprogramer.com/wp-content/uploads/2021/05/Leg-Raise.gif",
            defaultWeight: 0,
            cues: "Lower legs slowly without arching lumbar spine off mat."
          }
        ]
      },
      {
        category: "Cardio & Conditioning",
        items: [
          {
            id: "d3_c1",
            workoutXId: "0798",
            name: "Battle Rope (Power Slams)",
            sets: 1,
            targetReps: "20s Work / 40s Rest",
            rest: "40s",
            restSecs: 40,
            target: "Anaerobic Power & Conditioning",
            demo: "https://fitnessprogramer.com/wp-content/uploads/2021/06/Battle-Ropes.gif",
            defaultWeight: 0,
            cues: "Explosive slam into floor using core and hip extension."
          },
          {
            id: "d3_c2",
            workoutXId: "0798",
            name: "Cycling Sprints / Jumping Jacks",
            sets: 1,
            targetReps: "20s Work / 40s Rest",
            rest: "40s",
            restSecs: 40,
            target: "Cardiovascular Output",
            demo: "https://fitnessprogramer.com/wp-content/uploads/2021/06/Stationary-Bike.gif",
            defaultWeight: 0,
            cues: "High cadence burst followed by active breathing recovery."
          },
          {
            id: "d3_c3",
            workoutXId: "0178",
            name: "Full Body Static Stretching & Relaxation",
            sets: 1,
            targetReps: "20-30s per stretch",
            rest: "N/A",
            restSecs: 0,
            target: "Parasympathetic Recovery",
            demo: "https://fitnessprogramer.com/wp-content/uploads/2021/07/Band-Dislocation.gif",
            defaultWeight: 0,
            cues: "Slow diaphragmatic breathing to initiate muscular recovery."
          }
        ]
      }
    ]
  }
};

// ----------------------------------------------------------------------------
// 3. APPLICATION STATE
// ----------------------------------------------------------------------------
let currentView = "day-1"; // 'day-1', 'day-2', 'day-3', 'progress'
let currentActiveDay = 1;
let currentProgressDay = 1;
let expandedExerciseId = null; // Only one expanded at a time (exclusive accordion)

// Timer State
let timerInterval = null;
let timerSecondsLeft = 0;
let timerInitialSeconds = 0;
let activeTimerExerciseName = "";

// Chart instances registry
let chartInstances = {};

// Local Storage Key
const STORAGE_KEY = "theekshana_workout_suite_data_v2";

// ----------------------------------------------------------------------------
// 4. STORAGE & SYNC ENGINE (LocalStorage + Firebase Firestore)
// ----------------------------------------------------------------------------
function loadLocalData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (err) {
    console.error("Error reading localStorage:", err);
  }
  return {
    profile: { name: "Theekshana", height: "171 cm", weight: "69 kg", age: 19 },
    logs: {}, // logs[exerciseId][date] = [ { set: 1, weight: 50, reps: 8, done: true }, ... ]
    history: {} // historical 12-week baseline
  };
}

let appData = loadLocalData();

// Seed realistic 12-week baseline progression for all exercises if not present
function seedBaselineHistory() {
  if (!appData.history || Object.keys(appData.history).length === 0) {
    appData.history = {};
    const weeks = 12;

    [1, 2, 3].forEach(dayNum => {
      const plan = workoutPlan[dayNum];
      plan.sections.forEach(sec => {
        sec.items.forEach(ex => {
          const baseWeight = ex.defaultWeight || (ex.name.includes("Crunch") || ex.name.includes("Stretch") ? 0 : 20);
          const baseReps = parseInt(ex.targetReps) || 8;
          
          const historyPoints = [];
          for (let w = 1; w <= weeks; w++) {
            // Gradual progressive overload curve
            const weightProgress = baseWeight > 0 ? Math.round(baseWeight * (0.80 + (w / weeks) * 0.22)) : 0;
            const repsProgress = Math.min(15, Math.round(baseReps * (0.85 + (w / weeks) * 0.20)));
            historyPoints.push({
              week: `Wk ${w}`,
              weight: weightProgress,
              reps: repsProgress
            });
          }
          appData.history[ex.id] = historyPoints;
        });
      });
    });

    saveLocalData();
  }
}
seedBaselineHistory();

function saveLocalData() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(appData));
    updateSyncBadge(true, "Local Saved");
    syncToFirebase();
  } catch (err) {
    console.error("Error saving localStorage:", err);
  }
}

// Background sync to Firebase Firestore
let isSyncing = false;
async function syncToFirebase() {
  if (!firebaseInitialized || !db || isSyncing) return;
  
  isSyncing = true;
  updateSyncBadge(false, "Syncing Cloud...");

  try {
    const docRef = doc(db, "workout_logs", "user_theekshana");
    await setDoc(docRef, {
      updatedAt: new Date().toISOString(),
      logs: appData.logs || {},
      profile: appData.profile || {}
    }, { merge: true });

    updateSyncBadge(true, "Cloud & Cache Synced");
  } catch (err) {
    console.warn("Firebase sync error (data remains safe in browser cache):", err);
    updateSyncBadge(true, "Saved to Browser Storage");
  } finally {
    isSyncing = false;
  }
}

// Initial pull from Firebase on load
async function fetchFromFirebase() {
  if (!firebaseInitialized || !db) return;
  try {
    const docRef = doc(db, "workout_logs", "user_theekshana");
    const snapshot = await getDoc(docRef);
    if (snapshot.exists()) {
      const cloudData = snapshot.data();
      if (cloudData.logs) {
        // Merge cloud logs with local logs
        appData.logs = { ...appData.logs, ...cloudData.logs };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(appData));
        updateSyncBadge(true, "Cloud & Cache Synced");
      }
    }
  } catch (err) {
    console.warn("Could not fetch remote Firebase state (using local cache):", err);
  }
}

function updateSyncBadge(isOk, text) {
  const badge = document.getElementById("sync-status-badge");
  if (!badge) return;
  badge.innerHTML = `
    <span class="w-1.5 h-1.5 rounded-full ${isOk ? 'bg-emerald-400' : 'bg-amber-400 animate-ping'}"></span>
    <span>${text}</span>
  `;
}

// ----------------------------------------------------------------------------
// 5. DATE FORMATTER & TOP HEADER
// ----------------------------------------------------------------------------
function initHeaderDate() {
  const dateElem = document.getElementById("current-date-display");
  if (!dateElem) return;

  const now = new Date();
  // Clean simple date display at the top: "Tue, 15 Sep 2026"
  const options = { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' };
  const formatted = now.toLocaleDateString('en-GB', options);
  dateElem.textContent = formatted;
}

function getTodayLogKey() {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

// ----------------------------------------------------------------------------
// 6. ACCORDION WORKOUT LIST RENDERER (Exclusive Expand/Collapse)
// ----------------------------------------------------------------------------
function renderWorkoutView(dayNumber) {
  currentActiveDay = dayNumber;
  const plan = workoutPlan[dayNumber];
  if (!plan) return;

  // Update Hero Card
  const heading = document.getElementById("day-main-heading");
  const duration = document.getElementById("day-duration-badge");
  const guidelines = document.getElementById("day-guidelines-text");
  const iconBadge = document.getElementById("day-badge-icon");

  if (heading) heading.textContent = plan.title;
  if (duration) duration.textContent = plan.duration;
  if (guidelines) guidelines.textContent = plan.notes;
  if (iconBadge) {
    iconBadge.textContent = `DAY ${dayNumber}`;
    iconBadge.className = `px-2.5 py-1 rounded-lg font-mono font-bold text-xs bg-${plan.badgeColor}-950 text-${plan.badgeColor}-300 border border-${plan.badgeColor}-800/80`;
  }

  const container = document.getElementById("exercises-accordion-container");
  if (!container) return;
  container.innerHTML = "";

  const todayKey = getTodayLogKey();

  plan.sections.forEach((section, sIdx) => {
    // Section Title
    const secHeader = document.createElement("div");
    secHeader.className = "text-[11px] font-bold tracking-wider uppercase text-cyan-400/90 bg-slate-900/60 px-3.5 py-1.5 rounded-lg border border-slate-800 flex items-center gap-2 mt-4 first:mt-0";
    secHeader.innerHTML = `<i data-lucide="layers" class="w-3.5 h-3.5"></i> ${section.category}`;
    container.appendChild(secHeader);

    // Section Items
    section.items.forEach((ex, exIdx) => {
      const isExpanded = expandedExerciseId === ex.id;
      const card = document.createElement("div");
      card.id = `card-${ex.id}`;
      card.className = `glass-card rounded-2xl border transition-all duration-200 overflow-hidden ${
        isExpanded ? "glass-card-active" : "border-slate-800/80 hover:border-slate-700"
      }`;

      // Card Header / Summary Clickable Bar
      const headerBar = document.createElement("div");
      headerBar.className = "p-3.5 sm:p-4 flex items-center justify-between cursor-pointer select-none gap-2";
      headerBar.onclick = () => toggleAccordion(ex.id);

      // Check if user has logged sets today
      const todayLogs = (appData.logs && appData.logs[ex.id] && appData.logs[ex.id][todayKey]) || [];
      const completedCount = todayLogs.filter(s => s.done).length;
      const isAllDone = completedCount >= ex.sets && ex.sets > 0;

      headerBar.innerHTML = `
        <div class="flex items-center gap-3 flex-1 min-w-0 pr-2">
          <!-- Exercise Index Badge -->
          <div class="w-7 h-7 rounded-lg flex items-center justify-center font-mono font-bold text-xs flex-shrink-0 border ${
            isAllDone 
              ? 'bg-emerald-950 text-emerald-300 border-emerald-600' 
              : 'bg-slate-800 text-cyan-400 border-slate-700'
          }">
            ${isAllDone ? '<i data-lucide="check" class="w-4 h-4 text-emerald-400"></i>' : (exIdx + 1)}
          </div>
          
          <!-- Name and Target -->
          <div class="min-w-0">
            <h3 class="text-xs sm:text-sm font-bold text-white truncate transition ${isExpanded ? 'text-cyan-400' : ''}">${ex.name}</h3>
            <p class="text-[11px] text-slate-400 truncate">${ex.target}</p>
          </div>
        </div>

        <!-- Prominent Sets & Reps Volume Badges (Clear on Mobile) -->
        <div class="flex items-center gap-2 flex-shrink-0 text-right">
          <div class="flex flex-col items-end">
            <!-- Distinct, high contrast volume pill -->
            <span class="inline-flex items-center gap-1 font-mono font-extrabold text-[11px] sm:text-xs px-2.5 py-1 rounded-md bg-cyan-950/80 text-cyan-300 border border-cyan-700/60 shadow-sm">
              <i data-lucide="repeat" class="w-3 h-3 text-cyan-400"></i>
              <span>${ex.sets} SETS × ${ex.targetReps}</span>
            </span>
            ${completedCount > 0 ? `<span class="text-[9px] font-mono text-emerald-400 mt-0.5">${completedCount}/${ex.sets} Done</span>` : ''}
          </div>

          <!-- Expand Chevron Icon -->
          <div class="p-1 rounded-lg text-slate-400 hover:text-white transition transform ${isExpanded ? 'rotate-180 text-cyan-400' : ''}">
            <i data-lucide="chevron-down" class="w-4 h-4"></i>
          </div>
        </div>
      `;

      card.appendChild(headerBar);

      // Accordion Body Content (Rendered only when expanded)
      const bodyContainer = document.createElement("div");
      bodyContainer.id = `body-${ex.id}`;
      bodyContainer.className = `accordion-content border-t border-slate-800/80 bg-slate-950/50 ${isExpanded ? 'block' : 'hidden'}`;

      if (isExpanded) {
        bodyContainer.innerHTML = generateExpandedExerciseHTML(ex, todayLogs);
        setTimeout(() => loadExercise3DVisual(ex), 20);
      }

      card.appendChild(bodyContainer);
      container.appendChild(card);
    });
  });

  // Re-initialize Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

// Toggle accordion with EXCLUSIVE expand: close current, open clicked
window.toggleAccordion = function(exerciseId) {
  if (expandedExerciseId === exerciseId) {
    // If clicking already open card, collapse it
    expandedExerciseId = null;
  } else {
    // Collapse any previous and expand new
    expandedExerciseId = exerciseId;
  }
  renderWorkoutView(currentActiveDay);

  // Smooth scroll into view on mobile if expanding
  if (expandedExerciseId) {
    setTimeout(() => {
      const activeElem = document.getElementById(`card-${exerciseId}`);
      if (activeElem) {
        activeElem.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }, 50);
  }
// ----------------------------------------------------------------------------
// PERSISTENT 3D GIF CACHE MANAGER (Saves 500 requests/month quota forever)
// ----------------------------------------------------------------------------
const GIF_CACHE_NAME = "workoutx-3d-gifs-v3";

async function loadExercise3DVisual(ex) {
  const imgElem = document.getElementById(`gif-img-${ex.id}`);
  const badgeElem = document.getElementById(`gif-badge-${ex.id}`);
  if (!imgElem) return;

  if (!ex.workoutXId) {
    imgElem.src = ex.demo;
    if (badgeElem) badgeElem.innerHTML = `<span class="w-1.5 h-1.5 rounded-full bg-slate-400"></span> Standard 3D`;
    return;
  }

  const cacheKey = `https://workoutx-device-storage.local/gifs/${ex.workoutXId}.gif`;
  const apiUrl = `https://api.workoutxapp.com/v1/gifs/${ex.workoutXId}.gif?api-key=${WORKOUTX_API_KEY}`;

  try {
    if ('caches' in window) {
      const cache = await caches.open(GIF_CACHE_NAME);
      const cached = await cache.match(cacheKey);

      if (cached) {
        // LOADED 100% FROM DEVICE STORAGE (0 API REQUESTS!)
        const blob = await cached.blob();
        imgElem.src = URL.createObjectURL(blob);
        if (badgeElem) {
          badgeElem.innerHTML = `<span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> 💾 Saved on Device (0 API Calls)`;
        }
        return;
      }

      // First time loading on this device: Fetch once from API and cache permanently
      if (badgeElem) {
        badgeElem.innerHTML = `<span class="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span> Fetching & Saving to Device...`;
      }

      const res = await fetch(apiUrl);
      if (res.ok) {
        await cache.put(cacheKey, res.clone());
        const blob = await res.blob();
        imgElem.src = URL.createObjectURL(blob);
        if (badgeElem) {
          badgeElem.innerHTML = `<span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> 💾 Saved on Device (#${ex.workoutXId})`;
        }
        return;
      }
    }
  } catch (err) {
    console.warn("Device cache storage note:", err);
  }

  // Fallback if offline or quota limit reached
  imgElem.onerror = () => {
    imgElem.src = ex.demo;
    if (badgeElem) {
      badgeElem.innerHTML = `<span class="w-1.5 h-1.5 rounded-full bg-slate-400"></span> Backup 3D`;
    }
  };
  imgElem.src = apiUrl;
}

// Generate inside content of expanded exercise (Direct WorkoutX 3D GIF, cues, rest timer, in-place set logger)
function generateExpandedExerciseHTML(ex, existingLogs) {
  const todayKey = getTodayLogKey();
  
  // Direct WorkoutX API 3D GIF animation URL using the user's API Key!
  const workoutXGifUrl = ex.workoutXId 
    ? `https://api.workoutxapp.com/v1/gifs/${ex.workoutXId}.gif?api-key=${WORKOUTX_API_KEY}` 
    : ex.demo;

  // Previous logs memory hint
  let prevLogHint = "First time logging";
  if (appData.logs && appData.logs[ex.id]) {
    const dates = Object.keys(appData.logs[ex.id]).filter(d => d !== todayKey).sort().reverse();
    if (dates.length > 0) {
      const lastSets = appData.logs[ex.id][dates[0]];
      if (lastSets && lastSets.length > 0) {
        const best = lastSets[0];
        prevLogHint = `Previous: ${best.weight || 0} kg × ${best.reps || 0} reps (${dates[0]})`;
      }
    }
  }

  // Ensure set rows count matches exercise sets or at least 1
  const rowCount = Math.max(ex.sets || 3, existingLogs.length);
  let setRowsHTML = "";

  for (let i = 0; i < rowCount; i++) {
    const setNum = i + 1;
    const logItem = existingLogs[i] || {
      set: setNum,
      weight: ex.defaultWeight || "",
      reps: parseInt(ex.targetReps) || "",
      done: false
    };

    setRowsHTML += `
      <tr class="border-b border-slate-800/60 last:border-0 hover:bg-slate-900/30 transition">
        <td class="py-2.5 px-3 font-mono font-bold text-xs text-slate-400">
          <span class="w-5 h-5 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-[10px] text-cyan-300">
            ${setNum}
          </span>
        </td>
        <td class="py-2.5 px-2">
          <div class="relative flex items-center">
            <input 
              type="number" 
              step="0.5" 
              id="weight-${ex.id}-${i}" 
              value="${logItem.weight !== undefined && logItem.weight !== null ? logItem.weight : ''}" 
              placeholder="${ex.defaultWeight || 0}"
              onchange="handleSetInputChange('${ex.id}', ${i})"
              class="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs font-mono text-white text-center focus:border-cyan-400 transition"
            />
            <span class="absolute right-2 text-[9px] font-mono text-slate-500 pointer-events-none">kg</span>
          </div>
        </td>
        <td class="py-2.5 px-2">
          <input 
            type="number" 
            id="reps-${ex.id}-${i}" 
            value="${logItem.reps !== undefined && logItem.reps !== null ? logItem.reps : ''}" 
            placeholder="${parseInt(ex.targetReps) || 10}"
            onchange="handleSetInputChange('${ex.id}', ${i})"
            class="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs font-mono text-white text-center focus:border-cyan-400 transition"
          />
        </td>
        <td class="py-2.5 px-3 text-right">
          <button 
            onclick="toggleSetComplete('${ex.id}', ${i})" 
            id="btn-done-${ex.id}-${i}"
            class="px-2.5 py-1.5 rounded-lg text-xs font-semibold font-mono transition flex items-center gap-1 ml-auto ${
              logItem.done 
                ? 'bg-emerald-500 text-slate-950 shadow-sm font-bold' 
                : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
            }"
          >
            <i data-lucide="${logItem.done ? 'check-check' : 'check'}" class="w-3.5 h-3.5"></i>
            <span>${logItem.done ? 'DONE' : 'LOG'}</span>
          </button>
        </td>
      </tr>
    `;
  }

  return `
    <div class="p-4 space-y-4">
      
      <!-- 3D Biomechanical & Form Motion Demo (Device Cached - 0 Quota Waste) -->
      <div class="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
        <!-- 3D Player Window -->
        <div class="sm:col-span-6 w-full aspect-[4/3] bg-slate-950 rounded-xl overflow-hidden border border-slate-800 relative flex items-center justify-center shadow-inner">
          <img 
            id="gif-img-${ex.id}"
            src="" 
            alt="${ex.name} 3D Visual" 
            class="w-full h-full object-contain object-center transition duration-300"
          />
          <div id="gif-badge-${ex.id}" class="absolute top-2 left-2 px-2 py-0.5 rounded bg-slate-900/90 border border-slate-800 text-[10px] font-mono text-cyan-300 flex items-center gap-1">
            <span class="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span> Loading Device Cache...
          </div>
        </div>

        <!-- Target Anatomy & Rest Timer Widget -->
        <div class="sm:col-span-6 space-y-3">
          <div class="bg-slate-900/70 p-3 rounded-xl border border-slate-800 space-y-1">
            <div class="flex items-center justify-between text-xs">
              <span class="font-bold text-slate-300">Target Muscle:</span>
              <span class="text-cyan-400 font-mono text-[11px] font-medium">${ex.target}</span>
            </div>
            <p class="text-[11px] text-slate-400 leading-relaxed pt-1">
              ${ex.cues}
            </p>
          </div>

          <!-- Rest Timer Dock within Expanded Card (Silent completion alert as instructed) -->
          <div class="bg-slate-900/90 p-3 rounded-xl border border-slate-800 space-y-2">
            <div class="flex items-center justify-between">
              <span class="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <i data-lucide="timer" class="w-4 h-4 text-cyan-400"></i> Rest Timer
              </span>
              <span id="timer-display-${ex.id}" class="font-mono text-base font-black text-cyan-400">
                ${formatTime(ex.restSecs || 60)}
              </span>
            </div>
            <!-- Quick preset buttons -->
            <div class="grid grid-cols-4 gap-1.5">
              <button onclick="startCardTimer('${ex.id}', '${ex.name}', 30)" class="py-1 px-1.5 text-[11px] font-mono rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition">30s</button>
              <button onclick="startCardTimer('${ex.id}', '${ex.name}', 45)" class="py-1 px-1.5 text-[11px] font-mono rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition">45s</button>
              <button onclick="startCardTimer('${ex.id}', '${ex.name}', 60)" class="py-1 px-1.5 text-[11px] font-mono rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition">60s</button>
              <button onclick="startCardTimer('${ex.id}', '${ex.name}', 75)" class="py-1 px-1.5 text-[11px] font-mono rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition">75s</button>
            </div>
          </div>
        </div>
      </div>

      <!-- IN-PLACE SET & REPS LOGGER (Inside each expanded workout) -->
      <div class="bg-slate-900/80 rounded-xl border border-slate-800 p-3 sm:p-3.5 space-y-2.5">
        <div class="flex items-center justify-between">
          <div>
            <h4 class="text-xs font-bold text-slate-200 flex items-center gap-1.5">
              <i data-lucide="clipboard-check" class="w-4 h-4 text-cyan-400"></i> Set Logger
            </h4>
            <span class="text-[10px] font-mono text-slate-400">${prevLogHint}</span>
          </div>
          <button onclick="addExtraSetRow('${ex.id}')" class="text-[11px] font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1 px-2 py-1 rounded bg-cyan-950/60 border border-cyan-800/60">
            <i data-lucide="plus" class="w-3 h-3"></i> Add Set
          </button>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="border-b border-slate-800 text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                <th class="py-1.5 px-3 w-12">Set</th>
                <th class="py-1.5 px-2">Weight (kg)</th>
                <th class="py-1.5 px-2">Reps</th>
                <th class="py-1.5 px-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody id="set-rows-${ex.id}">
              ${setRowsHTML}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  `;
}

// ----------------------------------------------------------------------------
// 7. IN-PLACE SET LOGGING HANDLERS
// ----------------------------------------------------------------------------
window.handleSetInputChange = function(exerciseId, setIndex) {
  const todayKey = getTodayLogKey();
  if (!appData.logs[exerciseId]) appData.logs[exerciseId] = {};
  if (!appData.logs[exerciseId][todayKey]) appData.logs[exerciseId][todayKey] = [];

  const weightInput = document.getElementById(`weight-${exerciseId}-${setIndex}`);
  const repsInput = document.getElementById(`reps-${exerciseId}-${setIndex}`);

  const weightVal = weightInput ? parseFloat(weightInput.value) || 0 : 0;
  const repsVal = repsInput ? parseInt(repsInput.value) || 0 : 0;

  if (!appData.logs[exerciseId][todayKey][setIndex]) {
    appData.logs[exerciseId][todayKey][setIndex] = {
      set: setIndex + 1,
      weight: weightVal,
      reps: repsVal,
      done: false
    };
  } else {
    appData.logs[exerciseId][todayKey][setIndex].weight = weightVal;
    appData.logs[exerciseId][todayKey][setIndex].reps = repsVal;
  }

  saveLocalData();
};

window.toggleSetComplete = function(exerciseId, setIndex) {
  const todayKey = getTodayLogKey();
  if (!appData.logs[exerciseId]) appData.logs[exerciseId] = {};
  if (!appData.logs[exerciseId][todayKey]) appData.logs[exerciseId][todayKey] = [];

  const weightInput = document.getElementById(`weight-${exerciseId}-${setIndex}`);
  const repsInput = document.getElementById(`reps-${exerciseId}-${setIndex}`);

  const weightVal = weightInput ? parseFloat(weightInput.value) || 0 : 0;
  const repsVal = repsInput ? parseInt(repsInput.value) || 0 : 0;

  let currentSet = appData.logs[exerciseId][todayKey][setIndex];
  if (!currentSet) {
    currentSet = {
      set: setIndex + 1,
      weight: weightVal,
      reps: repsVal,
      done: true
    };
    appData.logs[exerciseId][todayKey][setIndex] = currentSet;
  } else {
    currentSet.done = !currentSet.done;
    currentSet.weight = weightVal;
    currentSet.reps = repsVal;
  }

  saveLocalData();

  // If completed, trigger rest timer automatically!
  if (currentSet.done) {
    // Find exercise details
    let foundEx = null;
    [1, 2, 3].forEach(d => {
      workoutPlan[d].sections.forEach(s => {
        const item = s.items.find(x => x.id === exerciseId);
        if (item) foundEx = item;
      });
    });

    if (foundEx && foundEx.restSecs > 0) {
      startCardTimer(exerciseId, foundEx.name, foundEx.restSecs);
    }
  }

  renderWorkoutView(currentActiveDay);
};

window.addExtraSetRow = function(exerciseId) {
  const todayKey = getTodayLogKey();
  if (!appData.logs[exerciseId]) appData.logs[exerciseId] = {};
  if (!appData.logs[exerciseId][todayKey]) appData.logs[exerciseId][todayKey] = [];

  const nextIndex = appData.logs[exerciseId][todayKey].length;
  appData.logs[exerciseId][todayKey].push({
    set: nextIndex + 1,
    weight: 0,
    reps: 10,
    done: false
  });

  saveLocalData();
  renderWorkoutView(currentActiveDay);
};

// ----------------------------------------------------------------------------
// 8. REST TIMER (No Sound on finish as instructed by user!)
// ----------------------------------------------------------------------------
function formatTime(seconds) {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0');
  const s = (seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

window.startCardTimer = function(exerciseId, exerciseName, durationSeconds) {
  clearInterval(timerInterval);
  timerSecondsLeft = durationSeconds;
  timerInitialSeconds = durationSeconds;
  activeTimerExerciseName = exerciseName;

  // Show floating dock in case user scrolls away
  const dock = document.getElementById("floating-timer-dock");
  const dockName = document.getElementById("dock-timer-name");
  const dockTime = document.getElementById("dock-timer-time");
  if (dock && dockName && dockTime) {
    dock.classList.remove("hidden");
    dockName.textContent = exerciseName.length > 18 ? exerciseName.substring(0, 18) + '...' : exerciseName;
    dockTime.textContent = formatTime(timerSecondsLeft);
  }

  const updateCardDisplay = (text, isFinished) => {
    const display = document.getElementById(`timer-display-${exerciseId}`);
    if (display) {
      display.textContent = text;
      if (isFinished) {
        display.classList.add("text-emerald-400", "timer-pulsing");
      } else {
        display.classList.remove("text-emerald-400", "timer-pulsing");
      }
    }
    if (dockTime) {
      dockTime.textContent = text;
      if (isFinished) {
        dockTime.classList.add("text-emerald-400");
      } else {
        dockTime.classList.remove("text-emerald-400");
      }
    }
  };

  updateCardDisplay(formatTime(timerSecondsLeft), false);

  timerInterval = setInterval(() => {
    timerSecondsLeft--;

    if (timerSecondsLeft <= 0) {
      clearInterval(timerInterval);
      // NO SOUND PLAYED (Visual alert only)
      updateCardDisplay("TIME UP!", true);

      setTimeout(() => {
        updateCardDisplay(formatTime(timerInitialSeconds), false);
        if (dock) dock.classList.add("hidden");
      }, 4000);
    } else {
      updateCardDisplay(formatTime(timerSecondsLeft), false);
    }
  }, 1000);
};

window.cancelActiveTimer = function() {
  clearInterval(timerInterval);
  const dock = document.getElementById("floating-timer-dock");
  if (dock) dock.classList.add("hidden");
  if (expandedExerciseId) {
    const display = document.getElementById(`timer-display-${expandedExerciseId}`);
    if (display) display.textContent = "00:00";
  }
};

// ----------------------------------------------------------------------------
// 9. PROGRESS VIEW (Day 1 / Day 2 / Day 3 Tabs & Charts for EVERY Workout)
// ----------------------------------------------------------------------------
window.renderProgressChartsForDay = function(dayNumber) {
  currentProgressDay = dayNumber;
  
  // Highlight active tab
  [1, 2, 3].forEach(d => {
    const tabBtn = document.getElementById(`prog-tab-${d}`);
    if (tabBtn) {
      if (d === dayNumber) {
        tabBtn.className = "px-3 py-1.5 text-xs font-bold rounded-lg transition bg-cyan-500 text-slate-950 shadow";
      } else {
        tabBtn.className = "px-3 py-1.5 text-xs font-semibold rounded-lg transition text-slate-400 hover:text-white";
      }
    }
  });

  const plan = workoutPlan[dayNumber];
  if (!plan) return;

  const progTitle = document.getElementById("progress-day-title");
  if (progTitle) {
    progTitle.innerHTML = `<i data-lucide="dumbbell" class="w-4 h-4 text-cyan-400"></i> ${plan.title} — All Workout Charts`;
  }

  const gridContainer = document.getElementById("charts-grid-container");
  if (!gridContainer) return;

  // Clean up existing Chart.js instances before destroying DOM
  Object.keys(chartInstances).forEach(key => {
    if (chartInstances[key]) {
      chartInstances[key].destroy();
      delete chartInstances[key];
    }
  });

  gridContainer.innerHTML = "";

  // Get all exercises for this day (Main workouts + warmups)
  const allExercises = [];
  plan.sections.forEach(s => {
    s.items.forEach(item => allExercises.push({ ...item, category: s.category }));
  });

  allExercises.forEach(ex => {
    // Generate Chart Card
    const card = document.createElement("div");
    card.className = "glass-card rounded-2xl p-4 border border-slate-800/90 space-y-3 shadow-md";

    const historyData = (appData.history && appData.history[ex.id]) || [];
    const latestPoint = historyData.length > 0 ? historyData[historyData.length - 1] : { weight: ex.defaultWeight || 0, reps: 8 };

    card.innerHTML = `
      <div class="flex items-start justify-between gap-2">
        <div>
          <span class="text-[10px] font-mono text-cyan-400 uppercase tracking-wider">${ex.category}</span>
          <h3 class="text-xs sm:text-sm font-bold text-white">${ex.name}</h3>
          <p class="text-[11px] text-slate-400">${ex.target}</p>
        </div>
        <div class="text-right font-mono flex-shrink-0">
          <span class="text-[9px] uppercase text-slate-500 block">Current Peak</span>
          <span class="text-xs font-bold text-cyan-400">${latestPoint.weight} kg × ${latestPoint.reps} reps</span>
        </div>
      </div>

      <div class="relative w-full aspect-[16/9] sm:aspect-[2/1] pt-1">
        <canvas id="chart-canvas-${ex.id}"></canvas>
      </div>
    `;

    gridContainer.appendChild(card);

    // Render Chart.js
    setTimeout(() => {
      initExerciseChart(ex.id, ex.name, historyData);
    }, 20);
  });

  if (window.lucide) window.lucide.createIcons();
};

function initExerciseChart(exerciseId, exerciseName, historyData) {
  const canvas = document.getElementById(`chart-canvas-${exerciseId}`);
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const labels = historyData.map(d => d.week);
  const weights = historyData.map(d => d.weight);
  const reps = historyData.map(d => d.reps);

  // Gradient for weight line
  const weightGradient = ctx.createLinearGradient(0, 0, 0, 180);
  weightGradient.addColorStop(0, 'rgba(6, 182, 212, 0.35)');
  weightGradient.addColorStop(1, 'rgba(6, 182, 212, 0.0)');

  chartInstances[exerciseId] = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'Weight (kg)',
          data: weights,
          borderColor: '#06b6d4',
          backgroundColor: weightGradient,
          borderWidth: 2.5,
          tension: 0.35,
          fill: true,
          yAxisID: 'yWeight',
          pointRadius: 3,
          pointBackgroundColor: '#06b6d4'
        },
        {
          label: 'Reps',
          data: reps,
          borderColor: '#a855f7',
          backgroundColor: 'transparent',
          borderWidth: 2,
          borderDash: [4, 4],
          tension: 0.35,
          yAxisID: 'yReps',
          pointRadius: 2.5,
          pointBackgroundColor: '#a855f7'
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        mode: 'index',
        intersect: false,
      },
      plugins: {
        legend: {
          display: true,
          position: 'top',
          labels: {
            color: '#94a3b8',
            font: { size: 10, family: 'JetBrains Mono' },
            boxWidth: 12,
            boxHeight: 8
          }
        },
        tooltip: {
          backgroundColor: '#0f172a',
          titleColor: '#f1f5f9',
          bodyColor: '#38bdf8',
          borderColor: '#334155',
          borderWidth: 1,
          padding: 8,
          bodyFont: { family: 'JetBrains Mono', size: 11 }
        }
      },
      scales: {
        x: {
          grid: { color: 'rgba(51, 65, 85, 0.25)' },
          ticks: { color: '#64748b', font: { size: 9, family: 'JetBrains Mono' } }
        },
        yWeight: {
          type: 'linear',
          display: true,
          position: 'left',
          grid: { color: 'rgba(51, 65, 85, 0.25)' },
          ticks: { color: '#06b6d4', font: { size: 9, family: 'JetBrains Mono' } },
          title: { display: false }
        },
        yReps: {
          type: 'linear',
          display: true,
          position: 'right',
          grid: { drawOnChartArea: false },
          ticks: { color: '#a855f7', font: { size: 9, family: 'JetBrains Mono' } },
          title: { display: false }
        }
      }
    }
  });
}

// ----------------------------------------------------------------------------
// 10. NAVIGATION & SIDE DRAWER CONTROLLER
// ----------------------------------------------------------------------------
window.switchView = function(viewKey) {
  currentView = viewKey;
  closeSideDrawer();

  const workoutView = document.getElementById("workout-view");
  const progressView = document.getElementById("progress-view");

  // Reset nav item styles
  ['day-1', 'day-2', 'day-3', 'progress'].forEach(k => {
    const navBtn = document.getElementById(`nav-${k}`);
    if (navBtn) {
      if (k === viewKey) {
        navBtn.classList.add("border-cyan-500", "bg-slate-800");
      } else {
        navBtn.classList.remove("border-cyan-500", "bg-slate-800");
      }
    }
  });

  if (viewKey === 'progress') {
    if (workoutView) workoutView.classList.add("hidden");
    if (progressView) progressView.classList.remove("hidden");
    renderProgressChartsForDay(currentProgressDay || 1);
  } else {
    if (progressView) progressView.classList.add("hidden");
    if (workoutView) workoutView.classList.remove("hidden");
    const dayNum = parseInt(viewKey.replace("day-", "")) || 1;
    renderWorkoutView(dayNum);
  }
};

function openSideDrawer() {
  const drawer = document.getElementById("side-drawer");
  const backdrop = document.getElementById("drawer-backdrop");
  if (drawer && backdrop) {
    backdrop.classList.remove("hidden");
    setTimeout(() => {
      backdrop.classList.remove("opacity-0");
      drawer.classList.remove("-translate-x-full");
    }, 10);
  }
}

function closeSideDrawer() {
  const drawer = document.getElementById("side-drawer");
  const backdrop = document.getElementById("drawer-backdrop");
  if (drawer && backdrop) {
    drawer.classList.add("-translate-x-full");
    backdrop.classList.add("opacity-0");
    setTimeout(() => {
      backdrop.classList.add("hidden");
    }, 300);
  }
}

// Data Backup Export
window.exportUserData = function() {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(appData, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute("href", dataStr);
  downloadAnchor.setAttribute("download", `theekshana_workout_backup_${getTodayLogKey()}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
};

// ----------------------------------------------------------------------------
// 11. INITIALIZATION ON DOM READY
// ----------------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
  initHeaderDate();

  // Drawer event listeners
  const openBtn = document.getElementById("open-drawer-btn");
  const closeBtn = document.getElementById("close-drawer-btn");
  const backdrop = document.getElementById("drawer-backdrop");

  if (openBtn) openBtn.addEventListener("click", openSideDrawer);
  if (closeBtn) closeBtn.addEventListener("click", closeSideDrawer);
  if (backdrop) backdrop.addEventListener("click", closeSideDrawer);

  // Initial render
  renderWorkoutView(1);

  // Attempt initial sync from Cloud Firestore
  fetchFromFirebase();
});
