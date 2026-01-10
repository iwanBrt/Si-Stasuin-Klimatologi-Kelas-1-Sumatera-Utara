<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class SendOtpMail extends Mailable
{
    use Queueable, SerializesModels;

    public $otp;
    public $type;
    public $expiresIn;

    /**
     * Create a new message instance.
     */
    public function __construct(string $otp, string $type = 'registration', int $expiresInMinutes = 10)
    {
        $this->otp = $otp;
        $this->type = $type;
        $this->expiresIn = $expiresInMinutes;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        $subject = $this->type === 'registration' 
            ? 'Verifikasi Email Anda - Sistem Magang UPT Klimatologi'
            : 'Kode Reset Password - Sistem Magang UPT Klimatologi';

        return new Envelope(
            subject: $subject,
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'emails.otp',
            with: [
                'otp' => $this->otp,
                'type' => $this->type,
                'expiresIn' => $this->expiresIn,
            ],
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
