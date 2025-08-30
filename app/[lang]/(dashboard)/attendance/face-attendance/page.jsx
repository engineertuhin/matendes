"use client";
import PageLayout from "@/components/page-layout";
import { useRef, useState, useCallback } from "react";
import Webcam from "react-webcam";

export default function FaceAttendance() {
    const webcamRef = useRef(null);

    // step: "closed" | "camera" | "photo"
    const [step, setStep] = useState("closed");
    const [image, setImage] = useState(null);

    // permission + UX states
    const [hasPermission, setHasPermission] = useState(null); // null | true | false
    const [isRequesting, setIsRequesting] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [mountWebcam, setMountWebcam] = useState(false); // force re-mount after permission

    const videoConstraints = {
        width: 540,
        facingMode: "user", 
    };

    // --- Actions ---
    const openCamera = async () => {
        setErrorMsg("");
        setIsRequesting(true);

        try {
            // Trigger browser permission prompt
            const stream = await navigator.mediaDevices.getUserMedia({
                video: true,
                audio: false,
            });
            // Close the probe stream (Webcam will own its own stream)
            stream.getTracks().forEach((t) => t.stop());

            setHasPermission(true);
            setStep("camera");

            // re-mount <Webcam> so it attaches cleanly
            setMountWebcam(false);
            setTimeout(() => setMountWebcam(true), 0);
        } catch (e) {
            setHasPermission(false);
            setStep("closed");
            setErrorMsg(
                typeof e?.message === "string"
                    ? e.message
                    : "Camera access denied or unavailable. Allow access in your browser settings."
            );
        } finally {
            setIsRequesting(false);
        }
    };

    const takePhoto = useCallback(() => {
        if (!webcamRef.current) return;
        const shot = webcamRef.current.getScreenshot();
        if (shot) {
            setImage(shot);
            setStep("photo");
        }
    }, []);

    const retake = () => {
        setImage(null);
        setStep("camera");
    };

    // Handlers from react-webcam (when mounted)
    const handleUserMedia = () => {
        setHasPermission(true);
        setErrorMsg("");
    };
    const handleUserMediaError = (e) => {
        setHasPermission(false);
        setStep("closed");
        setErrorMsg(
            typeof e?.message === "string"
                ? e.message
                : "Camera access blocked or no camera found."
        );
    };

    // Single button config
    const buttonConfig = {
        closed: {
            label: isRequesting ? "Opening…" : "📷 Open Camera",
            action: openCamera,
            disabled: isRequesting,
        },
        camera: {
            label: "📸 Take Photo",
            action: takePhoto,
            disabled: hasPermission !== true,
            title: hasPermission === true ? "" : "Allow camera access first",
        },
        photo: {
            label: "🔄 Retake",
            action: retake,
            disabled: false,
        },
    };

    const { label, action, disabled, title } = buttonConfig[step];

    return (
        <PageLayout>
            {/* Preview circle */}
            <div className="mt-5 flex justify-center">
                <div className="relative w-60 h-60 rounded-full border border-slate-200 bg-gradient-to-b from-slate-50 to-slate-100 shadow-sm overflow-hidden">
                    {step === "photo" && image ? (
                        <img
                            src={image}
                            alt="Captured"
                            className="w-full h-full object-cover rounded-full"
                        />
                    ) : step === "camera" &&
                      hasPermission !== false &&
                      mountWebcam ? (
                        <Webcam
                            ref={webcamRef}
                            audio={false}
                            screenshotFormat="image/jpeg"
                            videoConstraints={videoConstraints}
                            onUserMedia={handleUserMedia}
                            onUserMediaError={handleUserMediaError}
                            className="w-full h-full object-cover rounded-full"
                        />
                    ) : (
                        <div className="w-full h-full grid place-items-center text-center p-4 text-slate-500 text-sm">
                            {isRequesting
                                ? "Requesting camera permission…"
                                : hasPermission === false
                                ? "Camera blocked. Allow access in browser settings."
                                : "Camera closed. Click Open Camera."}
                        </div>
                    )}

                    {/* tiny flash dot */}
                    <span className="absolute top-3 right-6 size-1.5 rounded-full bg-rose-400 shadow-[0_0_0_2px_rgba(255,255,255,0.9)]" />
                </div>
            </div>

            {/* Status + error */}
            <div className="mt-4 text-center">
                <p className="text-sm text-slate-700">
                    {step === "photo"
                        ? "Attendance captured"
                        : step === "camera" && hasPermission
                        ? "Camera ready"
                        : "No attendance yet"}
                </p>
                {step !== "photo" && (
                    <p className="text-[11px] text-slate-500">
                        Face forward; good lighting recommended.
                    </p>
                )}
                {errorMsg && (
                    <p className="text-[11px] text-rose-600 mt-1">{errorMsg}</p>
                )}
            </div>

            {/* Single dynamic button */}
            <div className="mt-5">
                <button
                    onClick={action}
                    disabled={disabled}
                    title={title}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-slate-900 text-white px-4 py-2.5 text-sm font-medium shadow-sm hover:bg-slate-800 active:scale-[.99] disabled:opacity-60 disabled:cursor-not-allowed"
                >
                    {label}
                </button>
            </div>

            {/* Privacy note */}
            <div className="mt-4 text-[11px] leading-relaxed text-slate-500 border-t border-slate-100 pt-3">
                Photos are used only to verify attendance. On iOS/Safari, camera
                needs HTTPS and a user gesture to start.
            </div>
        </PageLayout>
    );
}
