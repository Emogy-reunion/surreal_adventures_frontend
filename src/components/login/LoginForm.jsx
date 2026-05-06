"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "@/styles/login/Login.module.css";
import { Mail, Lock, Loader2 } from "lucide-react";

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [formErrors, setFormErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState(null);
    const [globalError, setGlobalError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    
    const router = useRouter();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Reset states
        setIsLoading(true);
        setFormErrors({});
        setSuccessMessage(null);
        setGlobalError(null);

        try {
            const response = await fetch('/api/v1/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include', // Important for your JWT cookies
                body: JSON.stringify({ ...formData })
            });

            const data = await response.json();

            if (!response.ok) {
                if (data.errors) {
                    const formattedErrors = Object.keys(data.errors).reduce((acc, key) => {
                        acc[key] = data.errors[key].join(', ');
                        return acc;
                    }, {});
                    setFormErrors(formattedErrors);
                } else {
                    setGlobalError(data.error || 'An unexpected error occurred.');
                }
            } else {
                setSuccessMessage(data.success || "Login successful! Redirecting...");
                setTimeout(() => {
                    router.replace('/admin/dashboard');
                }, 2000);
            }
        } catch (error) {
            setGlobalError('Network error. Please check your connection.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.card}>
                <h2 className={styles.title}>Welcome Back</h2>
                <p className={styles.subtitle}>Login to continue your journey</p>

                <form className={styles.form} onSubmit={handleSubmit}>
                    {/* Global Error Display */}
                    {globalError && <div className={styles.errorBanner}>{globalError}</div>}
                    {successMessage && <div className={styles.successBanner}>{successMessage}</div>}

                    <div className={styles.inputContainer}>
                        <div className={styles.inputGroup}>
                            <Mail className={styles.icon} size={18} />
                            <input
                                name="email"
                                type="email"
                                placeholder="Email address"
                                className={styles.input}
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        {formErrors.email && <span className={styles.errorText}>{formErrors.email}</span>}
                    </div>

                    <div className={styles.inputContainer}>
                        <div className={styles.inputGroup}>
                            <Lock className={styles.icon} size={18} />
                            <input
                                name="password"
                                type="password"
                                placeholder="Password"
                                className={styles.input}
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        {formErrors.password && <span className={styles.errorText}>{formErrors.password}</span>}
                    </div>

                    <button 
                        type="submit" 
                        className={styles.button} 
                        disabled={isLoading}
                    >
                        {isLoading ? <Loader2 className={styles.spinner} size={18} /> : "Login"}
                    </button>
                </form>

                <p className={styles.footerText}>
                    Don’t have an account? <span className={styles.link} onClick={() => router.push('/signup')}>Sign up</span>
                </p>
            </div>
        </div>
    );
};

export default Login;
