export function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    console.log(`[runtime] node ${process.version}`);
  }
}
