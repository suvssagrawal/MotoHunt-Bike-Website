'use client';
import { useState } from 'react';

export default function FloatingLabelInput({
    id,
    label,
    type = 'text',
    value,
    onChange,
    error,
    required = false,
    icon,
    ...props
}) {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <div className="relative mb-6 group">
            <div className={`absolute top-4 left-4 text-gray-400 transition-colors duration-300 ${isFocused || value ? 'text-amber-500' : ''}`}>
                {icon}
            </div>
            <input
                id={id}
                type={type}
                value={value}
                onChange={onChange}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                required={required}
                className={`
                    w-full bg-black/30 border-2 rounded-xl px-12 py-4 text-white outline-none transition-all duration-300
                    ${error
                        ? 'border-red-500/50 focus:border-red-500'
                        : 'border-gray-700 focus:border-amber-500'
                    }
                    ${isFocused || value ? 'pt-6 pb-2' : ''}
                    placeholder-transparent
                `}
                placeholder={label}
                {...props}
            />
            <label
                htmlFor={id}
                className={`
                    absolute left-12 transition-all duration-300 pointer-events-none
                    ${isFocused || value || type === 'date'
                        ? 'top-1 text-xs text-amber-500 font-bold'
                        : 'top-4 text-gray-400 text-base'
                    }
                `}
            >
                {label} {required && <span className="text-red-500">*</span>}
            </label>

            {/* Error Message with Slide Animation */}
            <div className={`
                absolute -bottom-5 left-0 text-xs font-medium text-red-500 transition-all duration-300
                ${error ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'}
            `}>
                {error}
            </div>

            {/* Bottom Glow Line */}
            <div className={`
                absolute bottom-0 left-1/2 h-[2px] bg-amber-500 transition-all duration-500 transform -translate-x-1/2
                ${isFocused ? 'w-full opacity-100' : 'w-0 opacity-0'}
            `} />
        </div>
    );
}
