<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Selamat Datang di TECHNOVA</title>
</head>
<body style="font-family: Arial, sans-serif; color: #0A1D33; background-color: #F8FAFC; padding: 24px;">
    <div style="max-width: 560px; margin: 0 auto; background: #ffffff; border-radius: 12px; border: 1px solid #CFE0EE; padding: 32px;">
        <h2 style="color: #061426; margin-top: 0;">Halo, {{ $user->name }}!</h2>
        <p>Terima kasih telah bergabung di <b>{{ config('app.name', 'TECHNOVA') }}</b> menggunakan akun Google Anda (<b>{{ $user->email }}</b>).</p>
        <p>Kini Anda dapat langsung masuk tanpa perlu mengingat kata sandi tambahan dengan menggunakan tombol <b>Login dengan Google</b>.</p>
        <div style="margin: 28px 0;">
            <a href="{{ route('dashboard') }}"
               style="background: #00F0FF; color: #061426; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold; display: inline-block;">
                Buka Portal Dashboard
            </a>
        </div>
        <p style="font-size: 13px; color: #5A6B7F; margin-top: 24px; border-top: 1px solid #EEF2F6; padding-top: 16px;">
            Salam hangat,<br>
            <b>Tim TECHNOVA</b>
        </p>
    </div>
</body>
</html>
