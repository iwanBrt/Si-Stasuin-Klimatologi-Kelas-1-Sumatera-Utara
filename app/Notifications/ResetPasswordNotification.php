<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Support\Facades\Lang;

class ResetPasswordNotification extends Notification
{
    use Queueable;

    /**
     * The password reset token.
     *
     * @var string
     */
    public $token;

    /**
     * The callback that should be used to create the reset password URL.
     *
     * @var \Closure|null
     */
    public static $createUrlCallback;

    /**
     * The callback that should be used to build the mail message.
     *
     * @var \Closure|null
     */
    public static $toMailCallback;

    /**
     * Create a new notification instance.
     */
    public function __construct(string $token)
    {
        $this->token = $token;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        if (static::$toMailCallback) {
            return call_user_func(static::$toMailCallback, $notifiable, $this->token);
        }

        $url = $this->resetUrl($notifiable);
        $expireMinutes = config('auth.passwords.'.config('auth.defaults.passwords').'.expire');

        return (new MailMessage)
            ->subject('🔐 Reset Password - ' . config('app.name'))
            ->greeting('Halo, ' . $notifiable->name . '!')
            ->line('Anda menerima email ini karena kami menerima permintaan reset password untuk akun Anda.')
            ->line('Klik tombol di bawah ini untuk membuat password baru:')
            ->action('Reset Password Sekarang', $url)
            ->line('Link reset password ini akan **kadaluarsa dalam ' . $expireMinutes . ' menit**.')
            ->line('Jika Anda tidak meminta reset password, **abaikan email ini**. Tidak ada perubahan yang akan dilakukan pada akun Anda.')
            ->line('---')
            ->line('⚠️ **Catatan Keamanan:** Jangan bagikan link ini kepada siapapun!')
            ->salutation('Salam hormat, Tim ' . config('app.name'));
    }

    /**
     * Get the reset URL for the given notifiable.
     */
    protected function resetUrl(object $notifiable): string
    {
        if (static::$createUrlCallback) {
            return call_user_func(static::$createUrlCallback, $notifiable, $this->token);
        }

        // Build URL explicitly to ensure token is in path and email in query
        $baseUrl = config('app.url');
        $url = $baseUrl . '/reset-password/' . $this->token . '?email=' . urlencode($notifiable->getEmailForPasswordReset());
        
        return $url;
    }

    /**
     * Set a callback that should be used when creating the reset password button URL.
     */
    public static function createUrlUsing(?callable $callback): void
    {
        static::$createUrlCallback = $callback;
    }

    /**
     * Set a callback that should be used when building the notification mail message.
     */
    public static function toMailUsing(?callable $callback): void
    {
        static::$toMailCallback = $callback;
    }
}
