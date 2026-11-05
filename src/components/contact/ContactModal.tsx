'use client';
import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Send, Mail, CheckCircle2, AlertCircle } from 'lucide-react';

export function ContactForm({ onSuccess }: { onSuccess?: () => void }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [honey, setHoney] = useState(''); // invisible honeypot field
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');
        setErrorMessage('');

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, message, _honey: honey }),
            });

            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.error || 'Failed to send transmission');
            }

            setStatus('success');
            setName('');
            setEmail('');
            setMessage('');
            if (onSuccess) onSuccess();
        } catch (err: any) {
            setStatus('error');
            setErrorMessage(err.message || 'Something went wrong.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-md w-full font-mono text-sm">
            {/* Invisible honeypot field */}
            <input
                type="text"
                name="_honey"
                value={honey}
                onChange={(e) => setHoney(e.target.value)}
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
            />

            <div>
                <label className="block text-xs uppercase tracking-wider text-zinc-400 mb-1">Name</label>
                <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ada Lovelace"
                    className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 text-white rounded focus:border-blue-500 outline-none"
                    disabled={status === 'loading'}
                />
            </div>

            <div>
                <label className="block text-xs uppercase tracking-wider text-zinc-400 mb-1">Email</label>
                <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ada@example.com"
                    className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 text-white rounded focus:border-blue-500 outline-none"
                    disabled={status === 'loading'}
                />
            </div>

            <div>
                <label className="block text-xs uppercase tracking-wider text-zinc-400 mb-1">Message</label>
                <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Your message..."
                    className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 text-white rounded focus:border-blue-500 outline-none resize-none"
                    disabled={status === 'loading'}
                />
            </div>

            {status === 'error' && (
                <div className="flex items-center gap-2 text-red-400 text-xs bg-red-950/40 p-2.5 rounded border border-red-800">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMessage}</span>
                </div>
            )}

            {status === 'success' && (
                <div className="flex items-center gap-2 text-emerald-400 text-xs bg-emerald-950/40 p-2.5 rounded border border-emerald-800">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>✓ Message transmitted successfully!</span>
                </div>
            )}

            <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded transition-colors disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
            >
                <Send className="w-4 h-4" />
                <span>{status === 'loading' ? 'Transmitting...' : 'Send Message'}</span>
            </button>
        </form>
    );
}

export function ContactModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    useEffect(() => {
        if (!isOpen) return;
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, onClose]);

    if (!isOpen || typeof document === 'undefined') return null;

    return createPortal(
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm select-auto"
            onClick={onClose}
        >
            <div
                className="relative w-full max-w-md bg-zinc-950 border border-zinc-800 rounded-xl p-6 shadow-2xl text-white"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between border-b border-zinc-800 pb-3 mb-5">
                    <div className="flex items-center gap-2">
                        <Mail className="w-5 h-5 text-blue-400" />
                        <div>
                            <h2 className="text-base font-bold font-sans">Send a Message</h2>
                            <p className="text-[11px] text-zinc-400 font-mono">Delivers to abhishekmathpati2027@gmail.com</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-7 h-7 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                        aria-label="Close"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>

                <ContactForm onSuccess={() => {}} />
            </div>
        </div>,
        document.body
    );
}

export default ContactForm;

