import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';
import { Lock, Eye, EyeOff, CheckCircle } from 'lucide-react';
import { useState } from 'react';

export default function ResetPassword({ email }) {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const { data, setData, post, processing, errors } = useForm({
        email: email,
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('password.update'));
    };

    const passwordStrength = (password) => {
        if (password.length === 0) return { strength: 0, label: '', color: '' };
        if (password.length < 6) return { strength: 1, label: 'Lemah', color: 'bg-red-500' };
        if (password.length < 10) return { strength: 2, label: 'Sedang', color: 'bg-yellow-500' };
        return { strength: 3, label: 'Kuat', color: 'bg-green-500' };
    };

    const strength = passwordStrength(data.password);

    return (
        <GuestLayout>
            <Head title="Reset Password" />

            <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 px-4 py-12">
                <div className="w-full max-w-md">
                    <div className="relative overflow-hidden rounded-3xl bg-white shadow-2xl">
                        {/* Header */}
                        <div className="relative bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 px-8 py-10 text-center">
                            <div className="absolute inset-0 bg-grid-white/10 bg-[size:20px_20px]"></div>

                            <div className="relative">
                                <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                                    <Lock className="h-10 w-10 text-white" />
                                </div>

                                <h2 className="mb-2 text-3xl font-bold text-white">
                                    Reset Password
                                </h2>
                                <p className="text-blue-100">
                                    Buat password baru untuk akun Anda
                                </p>
                            </div>
                        </div>

                        <div className="p-8">
                            <form onSubmit={submit}>
                                {/* Password Field */}
                                <div className="mb-6">
                                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                                        Password Baru
                                    </label>
                                    <div className="relative">
                                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                                            <Lock className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            value={data.password}
                                            onChange={(e) => setData('password', e.target.value)}
                                            className="block w-full rounded-xl border-2 border-gray-300 bg-gray-50 py-3 pl-12 pr-12 text-gray-900 transition-all placeholder:text-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-200"
                                            placeholder="Minimal 8 karakter"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 hover:text-gray-600"
                                        >
                                            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                        </button>
                                    </div>
                                    {data.password && (
                                        <div className="mt-2">
                                            <div className="flex items-center justify-between text-xs">
                                                <span className="text-gray-600">Kekuatan: {strength.label}</span>
                                            </div>
                                            <div className="mt-1 h-2 w-full rounded-full bg-gray-200">
                                                <div
                                                    className={`h-full rounded-full transition-all ${strength.color}`}
                                                    style={{ width: `${(strength.strength / 3) * 100}%` }}
                                                />
                                            </div>
                                        </div>
                                    )}
                                    {errors.password && (
                                        <p className="mt-2 text-sm text-red-600">{errors.password}</p>
                                    )}
                                </div>

                                {/* Confirm Password */}
                                <div className="mb-6">
                                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                                        Konfirmasi Password
                                    </label>
                                    <div className="relative">
                                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                                            <Lock className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            type={showConfirmPassword ? 'text' : 'password'}
                                            value={data.password_confirmation}
                                            onChange={(e) => setData('password_confirmation', e.target.value)}
                                            className="block w-full rounded-xl border-2 border-gray-300 bg-gray-50 py-3 pl-12 pr-12 text-gray-900 transition-all placeholder:text-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-200"
                                            placeholder="Ulangi password baru"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 hover:text-gray-600"
                                        >
                                            {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                        </button>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4 font-bold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
                                >
                                    <span className="relative flex items-center justify-center gap-2">
                                        {processing ? (
                                            <>
                                                <svg className="h-5 w-5 animate-spin" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Menyimpan...
                                            </>
                                        ) : (
                                            <>
                                                <CheckCircle className="h-5 w-5" />
                                                Reset Password
                                            </>
                                        )}
                                    </span>
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
