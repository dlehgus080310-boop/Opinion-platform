'use client';

import { KeyboardEvent } from 'react';

interface ArticleEditorProps {
    id: string;
    name: string;
    defaultValue?: string;
    placeholder?: string;
    rows?: number;
    className?: string;
    required?: boolean;
}

export function ArticleEditor({ id, name, defaultValue, placeholder, rows = 12, className, required }: ArticleEditorProps) {
    const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Tab') {
            e.preventDefault();
            const target = e.currentTarget;
            const start = target.selectionStart;
            const end = target.selectionEnd;

            // set textarea value to: text before caret + tab + text after caret
            target.value = target.value.substring(0, start) + "\t" + target.value.substring(end);

            // put caret at right position again
            target.selectionStart = target.selectionEnd = start + 1;
        }
    };

    return (
        <textarea
            id={id}
            name={name}
            defaultValue={defaultValue}
            placeholder={placeholder}
            rows={rows}
            className={className}
            required={required}
            onKeyDown={handleKeyDown}
        />
    );
}
