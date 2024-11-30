import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table"
import { Trophy, Calendar, Users, ClipboardList, ScrollText, UserPlus } from 'lucide-react'

import Link from "next/link"

export default function BupatiCupProfile() {
  return (
    <>
      <div className="container mx-auto px-4 py-8 text-black ">
        {/* Cup Profile Section */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Trophy className="h-8 w-8 text-[#B73E3E] " />
            <h1 className="text-3xl font-bold">Bupati Cup Profile</h1>
          </div>
          <Card>
            <CardContent className="p-6 space-y-4">
              <p className="text-muted-foreground">
                Olahraga, khususnya sepak bola, memiliki peran penting dalam membentuk karakter generasi muda. Selain sebagai sarana fisik untuk menjaga kesehatan dan kebugaran, olahraga ini juga menanamkan nilai-nilai sportivitas, kerja sama tim, disiplin, serta tanggung jawab. Melalui kompetisi yang sehat, anak-anak dapat belajar tentang nilai kemenangan yang didapat dengan usaha keras, sekaligus belajar menerima kekalahan dengan lapang dada dan semangat untuk terus berkembang.
              </p>
              <p className="text-muted-foreground">
                Saat ini, banyak bakat muda di bidang sepak bola yang perlu diberikan ruang untuk menunjukkan kemampuan mereka. Namun, kesempatan bagi pemain-pemain usia dini, terutama kategori U-11 dan U-12, untuk berkompetisi dalam turnamen yang terorganisir secara baik masih terbatas. Oleh karena itu, BUPATI CUP Tournament Sepak Bola U-11 s/d U-12 hadir sebagai jawaban atas kebutuhan tersebut, bertujuan memberikan wadah bagi anak-anak usia 11 s/d 12 tahun untuk mengasah kemampuan dan mengembangkan potensi mereka dalam sepak bola.
              </p>
              <p className="text-muted-foreground">
                Dengan adanya dukungan dari berbagai pihak, baik orang tua, pelatih, masyarakat, maupun pihak sponsor, kami optimis BUPATI CUP Tournament Sepak Bola U-11 s/d U-12 akan berlangsung sukses dan membawa manfaat besar bagi semua pihak yang terlibat.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Schedule Section */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6 ">
            <Calendar className="h-8 w-8 text-[#B73E3E]" />
            <h2 className="text-2xl font-bold">Competition Schedule</h2>
          </div>
          <Card>
            <CardContent className="p-6 space-y-6">
              <div>
                <h3 className="font-bold text-lg mb-2">Hari Pertama - Sabtu, 21 Desember 2024</h3>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Jam</TableCell>
                      <TableCell>15.00 - 22.00 WIB</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Lokasi</TableCell>
                      <TableCell>Lapangan Desa Tumpakrejo, Kecamatan Kalipare, Kabupaten Malang</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Acara</TableCell>
                      <TableCell>
                        <ul className="list-disc list-inside">
                          <li>Babak Penyisihan 32 Tim</li>
                          <li>Bazzar UMKM</li>
                        </ul>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">Hari Kedua - Minggu, 22 Desember 2024</h3>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Jam</TableCell>
                      <TableCell>15.00 - 22.00 WIB</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Lokasi</TableCell>
                      <TableCell>Lapangan Desa Tumpakrejo, Kecamatan Kalipare, Kabupaten Malang</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Acara</TableCell>
                      <TableCell>
                        <ul className="list-disc list-inside">
                          <li>Babak 16 Besar dan Semifinal</li>
                          <li>Bazzar UMKM</li>
                          <li>Pertandingan Final</li>
                          <li>Penyerahan Tropy dan Hadiah: Juara I, II, III</li>
                          <li>Penyerahan Tropy dan Hadiah Top Score</li>
                          <li>Penyerahan Tropy dan Hadiah Pelatih Terbaik</li>
                        </ul>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">Hiburan Kolaborasi Seni - Minggu, 22 Desember 2024</h3>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Jam</TableCell>
                      <TableCell>22.00 WIB</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Lokasi</TableCell>
                      <TableCell>Lapangan Desa Tumpakrejo, Kecamatan Kalipare, Kabupaten Malang</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Acara</TableCell>
                      <TableCell>
                        <p>Hiburan Kolaborasi Seni, termasuk penampilan musik dari band anak muda lokal</p>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Target Audience */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Users className="h-8 w-8 text-[#B73E3E]" />
            <h2 className="text-2xl font-bold">Target Audience</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Sasaran Pengunjung</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-bold">1. Generasi Muda</h3>
                  <p className="text-muted-foreground">Generasi Z, usia 10-25 tahun (lahir antara 1997-2012)</p>
                  <p className="text-muted-foreground">Pelajar, mahasiswa, dan pemuda umum</p>
                </div>
                <div>
                  <h3 className="font-bold">2. Masyarakat Umum</h3>
                  <p className="text-muted-foreground">Generasi Y (Milenial) dan Generasi X, usia 26-62 tahun</p>
                  <p className="text-muted-foreground">Wiraswasta, Pegawai, Petani, Budayawan, dll</p>
                </div>
                <div>
                  <h3 className="font-bold">3. Usaha Mikro, Kecil, Menengah (UMKM)</h3>
                  <p className="text-muted-foreground">Generasi Y (Milenial) dan Generasi X, usia 26-62 tahun</p>
                  <p className="text-muted-foreground">Wiraswasta</p>
                </div>
                <div>
                  <h3 className="font-bold">4. Komunitas Seni dan Budaya</h3>
                  <p className="text-muted-foreground">Generasi Z, Generasi Y (Milenial), dan Generasi X, usia 10-62 tahun</p>
                  <p className="text-muted-foreground">Budayawan</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Persebaran dan Jumlah</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-bold">Persebaran Wilayah Pengunjung</h3>
                  <p className="text-muted-foreground">Kabupaten Malang: Kecamatan Kalipare, Donomulyo, Pagak, Sumberpucung, Bantur, dan lainnya</p>
                  <p className="text-muted-foreground">Kabupaten Blitar: Kecamatan Binangun, Wates, Kesamben, Selorejo, dan lainnya</p>
                </div>
                <div>
                  <h3 className="font-bold">Jumlah Pengunjung</h3>
                  <p className="text-muted-foreground">&ge; 500 orang/hari, total target sekitar 1000 pengunjung untuk 2 hari</p>
                </div>
                <div>
                  <h3 className="font-bold">Jumlah UMKM</h3>
                  <p className="text-muted-foreground">&ge; 10 UMKM dari Desa Tumpakrejo dan daerah lain</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Committee Structure */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <ClipboardList className="h-8 w-8 text-[#B73E3E]" />
            <h2 className="text-2xl font-bold">Committee Structure</h2>
          </div>
          <Card>
            <CardContent className="p-6 space-y-6">
              <p className="text-muted-foreground">
                Organizing Committee adalah kelompok yang bertanggung jawab atas perencanaan dan pelaksanaan operasional harian dari suatu proyek atau acara. OC berfokus pada aspek logistik dan teknis, memastikan semua detail pelaksanaan berjalan lancar.
              </p>
              <p className="text-muted-foreground">
                Organizing Committee terbentuk dari kolaborasi yang erat antara generasi muda dan masyarakat Tumpakrejo Relawan Immortal. Kami berkomitmen penuh untuk menyelenggarakan kegiatan BUPATI CUP Tournament Sepak Bola U-11 hingga U-12 dengan semangat gotong royong dan kebersamaan.
              </p>
              <div>
                <h3 className="font-bold text-lg mb-2">Pengurus Umum</h3>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Penasihat Penyelenggara I</TableCell>
                      <TableCell>Sumarno</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Penasihat Penyelenggara II</TableCell>
                      <TableCell>Abdul Gofur</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Pembina</TableCell>
                      <TableCell>Satari Wiyoto</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Pembina Teknis</TableCell>
                      <TableCell>Taseri</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Wakil Pembina</TableCell>
                      <TableCell>Galuh Pribadi</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Ketua Umum</TableCell>
                      <TableCell>Hendan Triyoga</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Wakil Ketua Umum</TableCell>
                      <TableCell>Sariantono</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Sekertaris I</TableCell>
                      <TableCell>Hendri</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Sekertaris II</TableCell>
                      <TableCell>Febri Ardila</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Bendahara I</TableCell>
                      <TableCell>Waris Adi</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Bendahara II</TableCell>
                      <TableCell>Brotoseno</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">Divisi-divisi</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Divisi Pelaksana Acara</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p><span className="font-medium">Koordinator:</span> Gatot Erwanto</p>
                      <p><span className="font-medium">Wakil Koordinator:</span> Dwi Indra</p>
                      <p><span className="font-medium">Anggota:</span> Hendri, Ade, Alfido, Avin, Gagas</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Divisi Humas</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p><span className="font-medium">Koordinator:</span> Avin Rachmad</p>
                      <p><span className="font-medium">Wakil Koordinator:</span> Gagas Adi</p>
                      <p><span className="font-medium">Anggota:</span> Saiin, Mardi</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Divisi Keamanan</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p><span className="font-medium">Koordinator:</span> Lutfi</p>
                      <p><span className="font-medium">Wakil Koordinator:</span> Yunan</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Divisi Perlengkapan</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p><span className="font-medium">Koordinator:</span> Matal</p>
                      <p><span className="font-medium">Wakil Koordinator:</span> Mat Soleh</p>
                      <p><span className="font-medium">Anggota:</span> Mat Toha, Ndandik, Yitno</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Divisi Konsumsi</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p><span className="font-medium">Koordinator:</span> Firdianto</p>
                      <p><span className="font-medium">Wakil Koordinator:</span> Gaguk</p>
                      <p><span className="font-medium">Anggota:</span> Adel</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Divisi Parkir</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p><span className="font-medium">Koordinator:</span> Suselo</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Divisi Dokumentasi & Publikasi</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p><span className="font-medium">Koordinator:</span> Faizal</p>
                      <p><span className="font-medium">Wakil Koordinator:</span> Deska</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Divisi Kesehatan</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p><span className="font-medium">Koordinator:</span> Faizal</p>
                      <p><span className="font-medium">Wakil Koordinator:</span> Deska</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Competition Rules */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <ScrollText className="h-8 w-8 text-[#B73E3E]" />
            <h2 className="text-2xl font-bold">Competition Rules</h2>
          </div>
          <Card>
            <CardContent className="p-6 space-y-4">
              <div>
                <h3 className="font-bold mb-2">Sistem Pertandingan</h3>
                <ul className="list-disc list-inside text-muted-foreground">
                  <li>Knock-Out (Gugur)</li>
                  <li>Durasi Pertandingan: 30 Menit (2 Babak @ 15 Menit)</li>
                  <li>Jeda Antar Pertandingan: 10 Menit</li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold mb-2">Jumlah Tim</h3>
                <p className="text-muted-foreground">32 Tim</p>
              </div>
              <div>
                <h3 className="font-bold mb-2">Durasi Kegiatan</h3>
                <p className="text-muted-foreground">2 Hari</p>
              </div>
              <div>
                <h3 className="font-bold mb-2">Waktu Pelaksanaan</h3>
                <p className="text-muted-foreground">15.00 - 22.00 WIB</p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Registration Links */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <UserPlus className="h-8 w-8 text-[#B73E3E]" />
            <h2 className="text-2xl font-bold">Registration</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Player Registration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Register as a player through your affiliated club. Make sure to prepare all required documents.
                </p>
                <Button className="w-full bg-[#B73E3E] hover:bg-[#B73E3E]/90">
                  <Link href="/player-registration">Register as Player</Link>
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Club Registration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Register your club to participate in the tournament. Limited slots available.
                </p>
                <Button className="w-full bg-[#B73E3E] hover:bg-[#B73E3E]/90">
                  <Link href="/club-registration">Register Club</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </>
  )
}
