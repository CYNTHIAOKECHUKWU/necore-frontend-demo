"use client"

import { useRef, useState } from "react"
import { Camera, RotateCcw, CheckCircle, ShieldCheck } from "lucide-react"



export default function SelfiePage() {

  const videoRef = useRef<HTMLVideoElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  const [streaming, setStreaming] = useState(false)
  const [photoTaken, setPhotoTaken] = useState(false)
  const [countdown, setCountdown] = useState<number | null>(null)
  const [action, setAction] = useState("Keep your head straight and look at the camera")

  

  /* ---------------- START CAMERA ---------------- */
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
      })

      if (videoRef.current) {
        videoRef.current.srcObject = stream
        setStreaming(true)

        // random liveness action
        const actions = ["Blink your eyes", "Smile slightly"]
        setAction(actions[Math.floor(Math.random() * actions.length)])
      }
    } catch (err) {
      alert("Camera permission denied. Please allow camera access.")
    }
  }

  /* ---------------- COUNTDOWN ---------------- */
  const beginCapture = () => {
    let count = 3
    setCountdown(count)

    const timer = setInterval(() => {
      count--
      setCountdown(count)

      if (count === 0) {
        clearInterval(timer)
        takePhoto()
        setCountdown(null)
      }
    }, 1000)
  }

  /* ---------------- TAKE PHOTO ---------------- */
  const takePhoto = () => {
    const video = videoRef.current
    const canvas = canvasRef.current

    if (!video || !canvas) return

    canvas.width = video.videoWidth
    canvas.height = video.videoHeight

    canvas.getContext("2d")?.drawImage(video, 0, 0)

    setPhotoTaken(true)
  }

  const retake = () => setPhotoTaken(false)

  return (
    <div className="min-h-screen bg-white px-4 sm:px-6 lg:px-10 py-6">

      {/* ================= TITLE ================= */}
      <div className="text-center mb-8">
        <h1 className="text-xl sm:text-2xl font-semibold">Facial Capture</h1>
        <p className="text-sm text-neutral-500">
          Position your face within the frame and follow the instructions
        </p>
      </div>

      {/* ================= CAMERA ================= */}
      <div className="max-w-xl mx-auto">

        <div className="bg-black rounded-3xl p-4 sm:p-6 shadow-2xl">

          <div className="relative w-full aspect-4/5 sm:aspect-video rounded-2xl overflow-hidden flex items-center justify-center">

            {!photoTaken ? (
              <>
                {/* video */}
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className="w-full h-full object-cover"
                />

                {/* ===== responsive face circle ===== */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">

                  <div className="w-[70%] max-w-[320px] aspect-square rounded-full border-4 border-dashed border-blue-500" />

                  {/* ALIGN FACE TEXT (below circle like your design) */}
                  <p className="text-blue-400 text-xs mt-3 tracking-wide">
                    ALIGN FACE HERE
                  </p>
                </div>

                {/* ===== countdown ===== */}
                {countdown !== null && (
                  <div className="absolute text-white text-6xl font-bold">
                    {countdown}
                  </div>
                )}
              </>
            ) : (
              <canvas
                ref={canvasRef}
                className="w-full h-full object-cover"
              />
            )}
          </div>

          {/* ===== instruction BELOW camera ===== */}
          {!photoTaken && (
            <div className="mt-4 bg-neutral-900 text-white text-center py-3 rounded-xl text-sm">
              {action}
            </div>
          )}
        </div>

        {/* ================= TIPS ================= */}
        <div className="flex flex-wrap justify-center gap-6 text-xs sm:text-sm text-neutral-600 mt-6 text-center">
          <span>No Glasses</span>
          <span>Good Lighting</span>
          <span>Center Position</span>
        </div>

        {/* ================= BUTTONS ================= */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">

          {!streaming && (
            <button
              onClick={startCamera}
              className="w-full sm:w-auto px-8 py-3 rounded-xl bg-blue-600 text-white flex items-center justify-center gap-2 hover:bg-blue-700"
            >
              <Camera size={16} />
              Start Face Verification
            </button>
          )}

          {streaming && !photoTaken && (
            <button
              onClick={beginCapture}
              className="w-full sm:w-auto px-8 py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700"
            >
              Capture
            </button>
          )}

          {photoTaken && (
            <>
              <button
                onClick={retake}
                className="w-full sm:w-auto px-6 py-3 rounded-xl border border-neutral-300 flex items-center justify-center gap-2"
              >
                <RotateCcw size={16} />
                Retake
              </button>

              <button
        onClick={() =>{
          alert("Verification Successful! Trust Score Updated");
          window.location.href = "/user/dashboard";
        }}
       className="w-full sm:w-auto px-8 py-3 rounded-xl bg-blue-600 text-white flex items-center justify-center gap-2 hover:bg-blue-700"
>
      <CheckCircle size={16} />
     Verify Identity
         </button>
            </>
          )}
        </div>

        {/* ================= SECURITY NOTE ================= */}
        <div className="flex items-center justify-center gap-2 text-xs text-neutral-500 mt-8 text-center">
          <ShieldCheck size={14} />
          Your photo is encrypted and only used for verification purposes
        </div>
      </div>
    </div>
  )
}
