import { CourseType, PartnerType, ProgramType, SocialMediaType, TestimonialType } from "./types";

export const socialMedia: SocialMediaType[] = [
  {
    id: 1,
    icon: "/assets/icons/ic_linkedin.svg",
    is_gradient: false,
    color_one: "#0076B2",
    navigate_url: "https://www.linkedin.com/company/hammercode",
  },
  {
    id: 2,
    icon: "/assets/icons/ic_instagram.svg",
    is_gradient: true,
    color_one: "#9A34C1",
    color_two: "#FF5746",
    navigate_url: "https://instagram.com/hmrcode",
  },
  {
    id: 3,
    icon: "/assets/icons/ic_youtube.svg",
    is_gradient: true,
    color_one: "#fe0033",
    color_two: "#fe0033",
    navigate_url: "https://www.youtube.com/@hammercode-dev",
  },
  {
    id: 4,
    icon: "/assets/icons/ic_github.svg",
    is_gradient: true,
    color_one: "#000",
    color_two: "#000",
    navigate_url: "https://github.com/hammercode-dev",
  },
];

export const partnersData: PartnerType[] = [
  {
    id: 2,
    logo: "/assets/images/logos/efishery-logo.png",
    alt: "Efishery Logo",
  },
  {
    id: 0,
    logo: "/assets/images/logos/educourse-logo.png",
    alt: "Educourse Logo",
  },
  {
    id: 1,
    logo: "/assets/images/logos/shipper-logo.png",
    alt: "Shipper Logo",
  },

  {
    id: 3,
    logo: "/assets/images/logos/icehouse-logo.png",
    alt: "Icehouse Logo",
  },
  {
    id: 4,
    logo: "/assets/images/logos/warungpintar-logo.png",
    alt: "Warung Pintar Logo",
  },
  {
    id: 5,
    logo: "/assets/images/logos/telkom-logo.png",
    alt: "Telkom Logo",
  },
  {
    id: 6,
    logo: "/assets/images/logos/bareksa-logo.png",
    alt: "Bareksa Logo",
  },
  {
    id: 7,
    logo: "/assets/images/logos/pddikti-logo.png",
    alt: "PDDikti Logo",
  },
  {
    id: 8,
    logo: "/assets/images/logos/satudikti-logo.png",
    alt: "Satudikti Logo",
  },
];

export const programData: ProgramType[] = [
  {
    id: "01",
    title: "Pendampingan",
    description:
      "Teman-teman anggota komunitas dari berbagai perusahaan teknologi siap membantu Kamu untuk persiapan aplikasi internship dan full-time job",
    icon: "/assets/images/illustrations/partnership.png",
  },
  {
    id: "02",
    title: "Kelas & Workshop",
    description:
      "Tersedia kelas dan workshop untuk berbagai bidang, seperti web, mobile apps hingga data. Tingakat materi yang disampaikan bervariasi, mulai dari beginner hingga advanced.",
    icon: "/assets/images/illustrations/classes.png",
  },
  {
    id: "03",
    title: "Bincang Teknologi",
    description:
      "Acara knowledge-sharing bulanan yang diisi oleh pemateri dari pelaku industri dan teman-teman komunitas.",
    icon: "/assets/images/illustrations/discuss.png",
  },
];

export const courseData: CourseType[] = [
  {
    id: 1,
    logo: "/assets/icons/ic_react.svg",
    title: "React",
    role: "Frontend Development",
  },
  {
    id: 2,
    logo: "/assets/icons/ic_golang.svg",
    title: "Golang",
    role: "Backend Development",
  },
  {
    id: 3,
    logo: "/assets/icons/ic_python.svg",
    title: "Python",
    role: "Data Science",
  },
  {
    id: 4,
    logo: "/assets/icons/ic_figma.svg",
    title: "Figma",
    role: "UI/UX Design",
  },
];

export const testimonialData: TestimonialType[] = [
  {
    id: 1,
    name: "Afandy Wibowo",
    role: "Backend Engineer",
    quote:
      "Di Hammercode saya mendapat banyak sekali teman belajar. Mulai dari belajar backend, sharing soal bahasa pemrograman atau tool yang sering di pake saat mendevelop program. Di hammercode juga ada senior yang dapat saya tanyakan langsung soal proyeksi kerjaan saat ini dan beberapa hal terkait teknikal tool. Dan nyamannya di hammercode kalau kita kumpul belajar bareng.",
    avatar_url: "/assets/images/peoples/afandy.webp",
    company_name: "Bareksa",
    company_url: "https://www.bareksa.com",
  },
  {
    id: 2,
    name: "Akwan Maroso",
    role: "Software Engineer",
    quote:
      "Being a part of this community has been incredibly valuable for my career as a software engineer. The community has played a significant role in my professional development, providing access to expert mentors and a competitive environment that constantly pushes me to improve. The support and encouragement from fellow community members have been instrumental in my journey, enabling me to become a software engineer from my very first year in college.",
    avatar_url: "/assets/images/peoples/akwan.webp",
    company_name: "Durioo+",
    company_url: "https://duriooplus.com",
  },
  {
    id: 3,
    name: "Fendi Irfan Amorokhman",
    role: "Data & AI",
    quote:
      "Hammercode adalah komunitas IT terbesar dan paling aktif di Palu, Sulawesi Tengah. Kami tumbuh pesat berkat pengurus yang sangat profesional. Setiap kegiatan yang mereka selenggarakan selalu sukses besar, seperti acara tahun lalu yang dihadiri banyak peserta",
    avatar_url: "/assets/images/peoples/fendi.webp",
    company_name: "OY Indonesia",
    company_url: "https://www.oyindonesia.com/id",
  },
  {
    id: 4,
    name: "Dwi Pasca Nursanti",
    role: "Ex Frontend Developer",
    quote:
      "Pada tahun 2018, saya sempat ragu apakah saya bisa berkarier sebagai seorang software developer atau tidak, karena tinggal jauh dari pusat industri teknologi. Namun, setelah bergabung dengan komunitas Hammercode menjadi titik balik dalam perjalanan saya. Lewat komunitas ini, saya mendapatkan banyak dukungan, baik dalam hal soft skills maupun hard skills. Bagi saya, Hammercode bukan sekadar komunitas, tetapi jembatan yang membuka peluang besar yang dulu terasa tidak bisa digapai",
    avatar_url: "/assets/images/peoples/dwi.webp",
    company_name: "Mudah.my",
    company_url: "https://www.mudah.my/",
  },
  {
    id: 5,
    name: "Khairun Nisa Cipta Hapsari",
    role: "Backend Engineer",
    quote:
      "To be honest kalo gak di Hammercode saya tidak secepat ini untuk bisa memahami materi tentang pemrograman. Di Hammercode banyak teman-teman yang jago-jago di bidangnya yang bisa dicuri ilmunya dan wawasannya untuk diimplementasikan. People in this community juga asik dan supportif, gak cuma jago coding temen-temen di sini vibesnya tuh positif banget. Komunitas ini sangat mendukung dan saya merasa termotivasi untuk terus belajar dan berkembang. Terima kasih Hammercode!",
    avatar_url: "/assets/images/peoples/cipta.webp",
    company_name: "KJA Furqan",
    company_url: "https://www.kjafurqan.com",
  },
  {
    id: 6,
    name: "Muhamad Putra Satria",
    role: "Software Engineer",
    quote:
      "Selama saya bergabung di Hammercode, banyak hal yang saya dapatkan. Mulai dari banyak ilmu programming, relasi, serta membuat saya lebih produktif. Komunitas adalah tempat belajar yang paling ampuh untuk meningkatkan skill. Tidak rugi, seriusan!",
    avatar_url: "/assets/images/peoples/alung.webp",
    company_name: "TAN Digital",
    company_url: "https://tandigital.id",
  },
  {
    id: 7,
    name: "Vicky Herdiansyah Adri",
    role: "Software Engineer",
    quote:
      "Di sini, saya banyak belajar tentang dunia coding dan mendapatkan mentor pertama saya. Awalnya, mereka mengajarkan seputar web development, tetapi seiring berjalannya waktu, mereka juga memberikan pembelajaran seputar karir. Hal ini sangat memotivasi saya untuk mencari pekerjaan di dunia industri sebagai software engineer. Mentor-mentor di Hammercode juga membimbing saya sampai mendapatkan my first internship :) Senang bisa menjadi bagian dari Hammercode 🥳🙏",
    avatar_url: "/assets/images/peoples/vicky.webp",
    company_name: "Pegadaian",
    company_url: "https://pegadaian.co.id",
  },
  {
    id: 8,
    name: "Faldiansyah",
    role: "Ex Software Engineer Intern",
    quote:
      "Banyak hal yang bisa kita ambil dalam komunitas ini, selain untuk belajar kita juga mendapatkan banyak jaringan. Bersama dengan teman-teman dan mentor yang saling memotivasi untuk kemajuan kedepan.",
    avatar_url: "/assets/images/peoples/faldi.webp",
    company_name: "Educourse.id",
    company_url: "https://educourse.id",
  },
  {
    id: 9,
    name: "Widya Ayunindya Poge",
    role: "Ex Web Developer Intern",
    quote:
      "Belajar di HMC tuh seru banget malah. Materinya up to date dan mentor2 nya udah pro dibidang tersebut. tapi setiap orang pasti memiliki teknik belajar sendiri2 dan mungkin pas bagian di ajar ka fandy sy gak cocok karena kecepatan mengajarnya tida relate dengan saya yang agak lambat ini yah gesya tapi bukann salah ka fandy tpi saya yang salah 😭🙏🏻. Tapi kalau boleh saran adain materi buat flow bisnis IT kali aja yang belajar di Hammercode bakal pada magang gak kaget2 banget pas tahap research fitur. Semangat hmc 😍",
    avatar_url: "/assets/images/peoples/widya.webp",
    company_name: "Infinite Learning",
    company_url: "https://www.infinitelearning.id",
  },
  {
    id: 10,
    name: "Tiara Juli Arsita",
    role: "Ex Backend Developer Intern",
    quote:
      "Seru kaka-kaka di HMC ga pelit ilmu dan bisa belajar dari kaka-kaka yang memang sudah expert hehe, jadi termotivasi buat untuk jadi women in tech with salaries >2 digits hehe :D",
    avatar_url: "/assets/images/peoples/yaya.webp",
    company_name: "Satudikti",
    company_url: "https://satudikti.id",
  },
  {
    id: 11,
    name: "Aisyah Rahmadani Pohontu",
    role: "Ex Backend Developer Intern",
    quote:
      "Selama di HMC saya belajar banyak hal, yaitu softskill dan hardskill. Ada banyak kakak-kakak dan teman-teman yang membantu saya dalam hal itu. Terutama ketika saya kurang paham tentang backend (bahasa go-lang). Selama pembelajaran di HMC, tapi kak Vicky dan kak Akwan membantu saya dalam memahami pembelajaran tersebut sehingga saya bisa mengerti dasar-dasar pemrograman golang. Pengalaman saya selama di HMC sangat beragam, tapi menyenangkan.",
    avatar_url: "/assets/images/peoples/anggi.webp",
    company_name: "PDDikti",
    company_url: "https://pddikti.kemdiktisaintek.go.id",
  },
  {
    id: 12,
    name: "Nadya Afriyani Azmi",
    role: "Ex Frontend Developer Intern",
    quote:
      "Selama di Hammercode banyak hal yang saya dapat. Terutama membantu saya lebih mahir dibidang yang saya ambil yaitu frontend. Saya diajari dari dasar sampai lebih mahir di bidang saya. Cara belajar yang santai tetapi terstruktur menjadi alasan utama saya sangat nyaman belajar disini. Selain itu banyak kegiatan lain yang kami lakukan di hammercode. Dan jugaaa kakak-kakak dan teman-teman di Hammercode baik-baik poll 😭😭.",
    avatar_url: "/assets/images/peoples/nadya.webp",
    company_name: "Pilih Jurusan",
    company_url: "https://pilihjurusan.id",
  },
  {
    id: 13,
    name: "Ade Sinta",
    role: "Ex Frontend Developer Intern",
    quote:
      "Learning at Hammercode is so much fun! The mentors are super cool, so the learning atmosphere never feels boring. What's even better is that the mentors have a lot of experience, and some of them even work abroad! That really motivates me to be like them. I've learned so many new things, and I'm always up-to-date with the latest technology trends.",
    avatar_url: "/assets/images/peoples/ades.webp",
    company_name: "Telkom Indonesia",
    company_url: "https://www.telkom.co.id",
  },
  {
    id: 14,
    name: "Adlim Dzaky",
    role: "Fullstack Developer Intern",
    quote:
      "Gabung di Hammercode udah kayak update firmware. Banyak bug di awal, tapi makin lama makin smooth. Semuanya berkat ilmu dan motivasi dari kakak-kakak mentor HMC 🫡",
    avatar_url: "/assets/images/peoples/adlim.webp",
    company_name: "QBIT",
    company_url: "https://qbit.co.id",
  },
  {
    id: 15,
    name: "Tjoet Muty Ahmad",
    role: "Fullstack Web Developer Intern",
    quote:
      "Masyaa Allah keren dan seru. i've met so many amazing people here yang enjoy sharing their knowledge, intinya tak pelit deh. get a lot of supports juga dari kaka kaka dan teman teman di hammercode, pokoknya memberikan positive impact hehe. thank youuu buat hammercode dan orang orang baik nyaa!!",
    avatar_url: "/assets/images/peoples/muty.webp",
    company_name: "DPRD Sulteng",
    company_url: "https://dprd.sultengprov.go.id",
  },
  {
    id: 16,
    name: "Muhammad Farhan Saleh",
    role: "Ex Frontend Developer Intern",
    quote:
      "Komunitas yang keren, mewadahi sebagai tempat untuk sharing ilmu. Banyak ilmu ilmu sakti yang hanya kita temukan di komunitas ini.",
    avatar_url: "/assets/images/peoples/farhan.webp",
    company_name: "Infinite Learning",
    company_url: "https://www.infinitelearning.id",
  },
  {
    id: 17,
    name: "Khairul Insan Karim",
    role: "MSIB Backend Engineering Student",
    quote:
      "Pengalaman yang sangat berharga selama bergabung dengan HammerCode. Saya banyak belajar dari kakak-kakak senior yang sangat sangat suhu dan sudah menyelam di dunia kerja IT. Rill banyak pelajaran baru yang didapatkan yang tidak bakalan didapatkan di kampus.",
    avatar_url: "/assets/images/peoples/irul.webp",
    company_name: "Ruangguru",
    company_url: "https://www.ruangguru.com/",
  },
];
