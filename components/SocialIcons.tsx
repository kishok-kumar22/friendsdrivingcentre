// Lucide v1 no longer includes brand logos; keep these small brand marks local.
export function Facebook({ size = 19 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M14 22v-9h3l.5-4H14V6.5c0-1.2.3-2 2-2h2V1.2C17.6 1.1 16.5 1 15 1c-3 0-5 1.8-5 5V9H7v4h3v9z" /></svg>;
}
export function Instagram({ size = 19 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></svg>;
}
export function Youtube({ size = 19 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><rect x="2" y="5" width="20" height="14" rx="4" /><path d="m10 9 5 3-5 3z" fill="currentColor" stroke="none" /></svg>;
}

export function WhatsApp({ size = 19, className }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.63C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19.01L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67M9.04 7.42C8.86 7.42 8.57 7.49 8.32 7.76C8.07 8.03 7.38 8.68 7.38 10C7.38 11.33 8.35 12.61 8.48 12.79C8.62 12.97 10.39 15.82 13.18 16.9C15.5 17.79 15.98 17.61 16.47 17.57C16.97 17.52 18.06 16.92 18.29 16.27C18.52 15.63 18.52 15.08 18.45 14.97C18.38 14.85 18.2 14.79 17.93 14.65C17.65 14.52 16.32 13.86 16.07 13.77C15.82 13.68 15.64 13.63 15.46 13.91C15.27 14.18 14.76 14.79 14.6 14.97C14.45 15.15 14.29 15.18 14.02 15.04C13.75 14.91 12.87 14.62 11.83 13.69C11.02 12.97 10.47 12.08 10.32 11.81C10.16 11.54 10.3 11.39 10.44 11.25C10.56 11.13 10.71 10.94 10.85 10.78C10.99 10.62 11.03 10.51 11.12 10.32C11.22 10.14 11.17 9.98 11.1 9.85C11.03 9.71 10.49 8.37 10.26 7.83C10.04 7.3 9.81 7.37 9.65 7.36C9.5 7.36 9.32 7.36 9.04 7.42Z" />
    </svg>
  );
}
