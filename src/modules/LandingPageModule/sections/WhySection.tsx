export const WhySection: React.FC = () => {
  const BENEFITS: string[] = [
    'Memperbaiki bacaan Al Quran sesuai dengan tuntunan Rasulullah',
    'Dibimbing oleh para ustadz dan ustadzah teruji profesional',
    'Menggunakan Metode Utsmani yang teruji mudah dan efektif',
    'Mendapatkan rapot dan sertifikat',
    "Berkesempatan besar mengikuti Wisuda Al Qur'an",
  ]
  return (
    <div>
      <section className="bg-[#75482f] text-white py-12 px-8 text-center max-w-full mx-auto mt-12 shadow-lg">
        <h2 className="heading-2 font-bold mb-6">
          Mengapa harus belajar Al-Quran di Al-Utsmani?
        </h2>
        <ul className="space-y-4 paragraph-lg inline-block text-left">
          {BENEFITS.map((benefit) => (
            <li className="flex items-center" key={benefit}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                className="text-yellow-400 w-10 h-10 mr-2"
              >
                <path d="M9 16.2l-3.5-3.5 1.4-1.4 2.1 2.1L16.6 7l1.4 1.4L9 16.2z" />
              </svg>
              {benefit}
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
