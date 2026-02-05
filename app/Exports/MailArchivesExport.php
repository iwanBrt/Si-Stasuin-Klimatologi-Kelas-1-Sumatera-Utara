<?php

namespace App\Exports;

use App\Models\MailArchive;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithStyles;
use Maatwebsite\Excel\Concerns\WithColumnWidths;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;
use PhpOffice\PhpSpreadsheet\Style\Alignment;
use PhpOffice\PhpSpreadsheet\Style\Fill;

class MailArchivesExport implements FromCollection, WithHeadings, WithStyles, WithColumnWidths
{
    protected $category;
    protected $period;
    protected $month;
    protected $year;

    public function __construct($category = null, $period = 'all', $month = null, $year = null)
    {
        $this->category = $category;
        $this->period = $period;
        $this->month = $month;
        $this->year = $year;
    }

    public function collection()
    {
        $query = MailArchive::query();

        // Filter by category
        if ($this->category) {
            $query->where('category', $this->category);
        }

        // Filter by period
        if ($this->period === 'month' && $this->month && $this->year) {
            $query->whereYear('date', $this->year)
                  ->whereMonth('date', $this->month);
        } elseif ($this->period === 'year' && $this->year) {
            $query->whereYear('date', $this->year);
        }

        $archives = $query->orderBy('date', 'desc')->get();

        return $archives->map(function ($archive, $index) {
            return [
                'no' => $index + 1,
                'reference_number' => $archive->reference_number,
                'sender' => $archive->sender,
                'recipient' => $archive->recipient,
                'subject' => $archive->subject,
                'category' => $archive->category === 'incoming' ? 'Surat Masuk' : 'Surat Keluar',
                'date' => \Carbon\Carbon::parse($archive->date)->format('d/m/Y'),
            ];
        });
    }

    public function headings(): array
    {
        return [
            'No',
            'Nomor Surat',
            'Pengirim',
            'Penerima',
            'Perihal',
            'Kategori',
            'Tanggal',
        ];
    }

    public function styles(Worksheet $sheet)
    {
        return [
            1 => [
                'font' => ['bold' => true, 'size' => 12],
                'fill' => [
                    'fillType' => Fill::FILL_SOLID,
                    'startColor' => ['rgb' => '2563EB']
                ],
                'alignment' => [
                    'horizontal' => Alignment::HORIZONTAL_CENTER,
                    'vertical' => Alignment::VERTICAL_CENTER,
                ],
            ],
        ];
    }

    public function columnWidths(): array
    {
        return [
            'A' => 5,
            'B' => 20,
            'C' => 30,
            'D' => 30,
            'E' => 40,
            'F' => 15,
            'G' => 15,
        ];
    }
}
