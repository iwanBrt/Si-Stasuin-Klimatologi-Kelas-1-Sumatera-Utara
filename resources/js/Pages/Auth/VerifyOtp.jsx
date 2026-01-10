import { Head, useForm } from '@inertiajs/react';
import { useState, useEffect, useRef } from 'react';
import { Mail, Clock, RefreshCw, ArrowRight } from 'lucide-react';

export default function VerifyOtp({ email, type = 'registration' }) {
    const [timeLeft, setTimeLeft] = useState(600); // 10 minutes
    const [otpValues, setOtpValues] = useState(['', '', '', '', '', '']);
    const inputRefs = useRef([]);

    const { data, setData, post, processing, errors } = useForm({
        email: email,
        otp: '',
        type: type
    });

    // Countdown timer
    useEffect(() => {
        if (timeLeft <= 0) return;
        const timer = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);
        return () => clearInterval(timer);
    }, [timeLeft]);

    // Format time display
    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    // Handle OTP input change
    const handleOtpChange = (index, value) => {
        if (value.length > 1) value = value.slice(0, 1);
        if (!/^\d*$/.test(value)) return;

        const newOtpValues = [...otpValues];
        newOtpValues[index] = value;
        setOtpValues(newOtpValues);

        // Auto focus next input
        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }

        // Update form data
        setData('otp', newOtpValues.join(''));
    };

    // Handle backspace
    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !otpValues[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    // Handle paste
    const handlePaste = (e) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text').slice(0, 6);
        if (!/^\d+$/.test(pastedData)) return;

        const newOtpValues = pastedData.split('');
        while (newOtpValues.length < 6) newOtpValues.push('');
        setOtpValues(newOtpValues);
        setData('otp', pastedData);

        const nextIndex = Math.min(pastedData.length, 5);
        inputRefs.current[nextIndex]?.focus();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (type === 'registration') {
            post(route('verification.verify'));
        } else {
            post(route('password.verify.check'));
        }
    };

    const handleResend = () => {
        post(route('verification.resend'), {
            data: { email, type },
            onSuccess: () => {
                setTimeLeft(600);
                setOtpValues(['', '', '', '', '', '']);
                setData('otp', '');
                inputRefs.current[0]?.focus();
            }
        });
    };

    return (
        <>
            <Head title="Verifikasi OTP" />

            {/* Background Image Full Screen */}
            <div className="flex min-h-screen w-full items-center justify-center bg-slate-900 bg-cover bg-center"
                 style={{ backgroundImage: "url('https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?q=80&w=2565&auto=format&fit=crop')" }}>
                
                {/* Overlay Gelap */}
                <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px]"></div>

                {/* Glassy Container */}
                <div className="relative z-10 w-full max-w-md p-8 mx-4 overflow-hidden rounded-2xl border border-white/10 bg-white/10 shadow-2xl backdrop-blur-md sm:px-10 text-center">
                    
                    {/* Icon Header */}
                    <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-blue-500/20 ring-1 ring-blue-400/30 backdrop-blur-sm">
                        <Mail className="h-8 w-8 text-blue-400" />
                    </div>

                    <div className="mb-8">
                        <h2 className="text-2xl font-bold tracking-tight text-white drop-shadow-md">
                            Verifikasi Email Anda
                        </h2>
                        <p className="mt-2 text-sm text-slate-200">
                            Kami telah mengirimkan kode 6 digit ke:
                        </p>
                        <p className="font-medium text-blue-300 mt-1">{email}</p>
                    </div>

                    {/* Timer Badge */}
                    <div className="mb-6 flex justify-center">
                        <div className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium backdrop-blur-sm border ${
                            timeLeft > 60 
                                ? 'bg-green-500/10 text-green-300 border-green-500/20' 
                                : 'bg-red-500/10 text-red-300 border-red-500/20'
                        }`}>
                            <Clock className="h-3 w-3" />
                            <span>{timeLeft > 0 ? formatTime(timeLeft) : 'Kode Kedaluwarsa'}</span>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit}>
                        {/* OTP Input Grid */}
                        <div className="mb-8 flex justify-center gap-2 sm:gap-3">
                            {otpValues.map((value, index) => (
                                <input
                                    key={index}
                                    ref={(el) => (inputRefs.current[index] = el)}
                                    type="text"
                                    inputMode="numeric"
                                    maxLength="1"
                                    value={value}
                                    onChange={(e) => handleOtpChange(index, e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(index, e)}
                                    onPaste={handlePaste}
                                    className={`h-12 w-10 sm:h-14 sm:w-12 rounded-xl border text-center text-xl font-bold transition-all duration-200 focus:outline-none focus:ring-0 backdrop-blur-sm
                                        ${errors.otp 
                                            ? 'border-red-400/50 bg-red-500/10 text-red-300' 
                                            : value 
                                                ? 'border-blue-400 bg-blue-500/20 text-white' 
                                                : 'border-white/10 bg-black/20 text-white'
                                        }
                                        focus:border-blue-400 focus:bg-black/40
                                    `}
                                    autoFocus={index === 0}
                                />
                            ))}
                        </div>

                        {/* Error Message */}
                        {errors.otp && (
                            <div className="mb-6 text-sm text-red-300 font-medium animate-pulse">
                                {errors.otp}
                            </div>
                        )}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={processing || data.otp.length !== 6 || timeLeft <= 0}
                            className="group w-full rounded-xl bg-blue-600/90 py-3.5 font-bold text-white shadow-lg shadow-blue-900/50 backdrop-blur-sm hover:bg-blue-500 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed border border-blue-400/20 flex items-center justify-center gap-2"
                        >
                            {processing ? (
                                <>
                                    <RefreshCw className="h-5 w-5 animate-spin" /> Verifikasi...
                                </>
                            ) : (
                                <>
                                    Verifikasi <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>

                        {/* Resend Link */}
                        <div className="mt-6 text-center">
                            <p className="text-sm text-slate-300">
                                Belum menerima kode?{' '}
                                <button
                                    type="button"
                                    onClick={handleResend}
                                    disabled={processing || timeLeft > 0}
                                    className="font-semibold text-white hover:text-blue-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed hover:underline"
                                >
                                    Kirim Ulang
                                </button>
                            </p>
                        </div>
                    </form>
                </div>

                {/* Footer Copyright */}
                <div className="absolute bottom-6 text-xs text-white/40">
                    &copy; {new Date().getFullYear()} UPT Stasiun Klimatologi.
                </div>
            </div>
        </>
    );
}