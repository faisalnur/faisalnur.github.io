---
categories: Tulisan
image: true
date: 2025-06-14
layout: post
permalink: /jurnalis-nvim/
title: Neovim untuk Mendukung Kerja Jurnalis
---
Sebagai seorang jurnalis, tuntutan kecepatan, efisiensi, dan adaptasi terhadap teknologi adalah hal esensial. Kali ini, saya akan berbagi tentang salah satu perangkat lunak yang sangat integral dalam alur kerja saya: NeoVim.

Di tengah banyaknya *word processor* canggih, mengapa memilih *text editor* berbasis *terminal* ini? Jawabannya sederhana: **ringan, portabel, dan personalisasi tanpa batas.** Saya membutuhkan aplikasi yang bisa digunakan di mana saja tanpa pusing memikirkan instalasi ulang *template*, makro, atau konfigurasi tampilan. NeoVim, dengan *file* konfigurasinya yang ringkas, memungkinkan saya membawa seluruh *workspace* penulisan dalam sebuah *flash drive* atau bahkan sekadar menyalinnya. Seluruh blog ini, termasuk tulisan yang sedang saya baca ini, saya tulis menggunakan Vim dan format Markdown.

Mengapa Markdown? Karena saya enggan terikat dengan format *proprietary* atau aplikasi pengolah kata yang terlalu banyak fitur yang justru memecah fokus. Markdown memungkinkan saya menulis dengan cepat, menjaga struktur tulisan, dan menghasilkan *output* yang bersih serta mudah dikonversi ke berbagai format. NeoVim adalah tandem sempurna untuk kebiasaan ini.

Nah, mari kita bedah bagaimana saya meracik NeoVim ini menjadi "ruang kerja" yang *neat and clean*, sekaligus *powerful* untuk kebutuhan jurnalisme saya.

---

#### **1. Konfigurasi Tampilan: Fokus Tanpa Distraksi**

Sebagai penulis, saya membutuhkan *workspace* yang minim gangguan. NeoVim saya dirancang agar terlihat bersih dan efisien:

* `set laststatus=2` dan `set cmdheight=0`: Baris status (`statusline`) selalu terlihat di bagian bawah, tetapi *command line* tersembunyi saat tidak aktif. Ini memberikan ruang pandang yang maksimal untuk teks.
* `set noshowmode`: Mode editor (Normal, Insert, dll.) ditangani dengan rapi oleh *plugin* `lightline.vim` di *statusline*, sehingga tidak ada informasi redundan.
* `set wrap linebreak nolist` dan `set breakindent`: Teks akan otomatis terbungkus rapi tanpa terpotong di tengah kata, dan indentasi akan berlanjut di baris baru. Ini memastikan draf artikel saya selalu terlihat bersih dan mudah dibaca, mirip seperti tampilan buku, tanpa perlu *scroll* horizontal yang melelahkan.
* `set nu rnu`: Nomor baris ditampilkan secara absolut (`nu`) dan relatif (`rnu`). `rnu` sangat membantu saya melompat antar baris dengan cepat (misalnya, `5j` untuk 5 baris ke bawah), sementara `nu` berguna untuk referensi dalam draf.
* `highlight LineNr ctermfg=darkgrey` & `hi CursorLineNr ... ctermbg=yellow`: Saya mengatur warna nomor baris agar tidak terlalu mencolok, namun nomor baris di kursor akan menonjol dengan latar kuning. Ini memudahkan saya fokus pada baris yang sedang saya kerjakan.
* `set fillchars=vert:┃,diff:·,horiz:━,horizup:┻,horizdown:┳,vertleft:┫,vertright:┣`: Pengaturan ini untuk estetika visual *interface*, membuat pemisah jendela dan elemen lainnya terlihat lebih modern dan nyaman di mata.

#### **2. Fitur Pendukung Jurnalisme: Otomatisasi dan Navigasi Cepat**

Inilah bagian di mana NeoVim benar-benar bersinar dalam mendukung pekerjaan saya, terutama dalam penulisan naskah berita dan transkrip wawancara.

* **Penghitung Kata Instan (`lightline.vim` dengan `WordCount()`):**
    ```vim
    " ... (bagian konfigurasi lightline.vim) ...
    \ 'component_function': {
    \   'clock':'Clock',
    \   'date' :'Date',
    \   'word':'WordCount'
    \ },
    " ...
    function WordCount()
        if has_key(wordcount(),'visual_words')
            let g:word_count=wordcount().visual_words
            return "Word Count:\ ".g:word_count
        else
            let g:word_count=wordcount().words
            return "Word Total:\ ".g:word_count
        endif
    endfunction
    ```
    Sebagai jurnalis, sering kali ada batasan jumlah kata. Fungsi ini menampilkan jumlah kata total atau kata yang dipilih secara *real-time* di *statusline*. Saya bisa memantau panjang artikel saya tanpa harus berhenti menulis atau membuka aplikasi lain. Sangat efisien!

* **Template Otomatis (`ByLine()`, `Transkrip()`, `Review()`):**
    ```vim
    function! ByLine()
        let BI = "\nBI - "
        let HeadBI = "## " 
        let Tanggal = system("date +%d") 
        let Tanggalfull = system("date +%d/%m/%Y")
        put = HeadBI . Tanggalfull
        put = BI . Tanggal
        r!echo -e "Muhammad Faisal Nur Ikhsan - 186 \n"
        r!echo -e "Bisnis.com, SEMARANG - "
    endfunction

    function! Transkrip()
        let HeadTrans = "## "
        let Tanggalfull =  system("date +%d/%m/%Y")
        put = HeadTrans . Tanggalfull
    endfunction

    function! Review()
        r!echo -e "\#\#\#\n\nTitle: \nAuthor: \nContact: \nTags: \nDOI: \n\n\#\#\#\#"
    endfunction

    nmap <leader>tr :call Review()<CR> A
    nmap <leader>tb :call ByLine()<CR> A
    nmap <leader>tt :call Transkrip()<CR> A
    nmap <leader>td :r!date "+\%A, \%d \%B - \%H:\%M"<CR> A
    ```
   Ini adalah penyelamat waktu saya. Dengan *shortcut* seperti `<leader>tb`, saya bisa langsung menyisipkan *byline* standar untuk tulisan Bisnis Indonesia (lengkap dengan nama, ID, tanggal, dan lokasi). Ada juga *template* untuk transkrip wawancara (`<leader>tt`) dan *review* artikel (`<leader>tr`), yang membantu saya menjaga konsistensi format dan memulai tugas dengan lebih cepat.

* **Autotext & Karakter Khusus (`inoremap`):**
    ```vim
    inoremap alh alhamdulillah
    inoremap 'yg yang
    inoremap `kab kabupaten
    inoremap +- ±
    ```
    Saya mengatur *autotext* untuk singkatan atau frasa yang sering saya gunakan, termasuk istilah ekonomi (`yoy`, `manufaktur`) atau nama daerah. Ini juga mencakup karakter khusus seperti `±` atau `°`. Ini bukan hanya mempercepat pengetikan, tetapi juga mengurangi kesalahan ketik, memastikan akurasi data dan narasi.

* **Pencarian dan Navigasi Cerdas (`set hlsearch`, `set incsearch`, `set ignorecase`, `set smartcase`, `telescope.nvim`, `telescope-heading.nvim`):**
    ```vim
    set hlsearch
    set incsearch
    set ignorecase
    set smartcase
    nnoremap <leader>ft :Telescope live_grep<CR>
    nnoremap <leader>fh :Telescope heading<CR>
    ```
    Saat berhadapan dengan tumpukan catatan atau dokumen riset, kemampuan mencari adalah segalanya. Pengaturan ini membuat pencarian sangat efisien: hasil disorot (`hlsearch`), diperbarui saat mengetik (`incsearch`), dan cerdas dalam membedakan huruf besar/kecil (`smartcase`). *Plugin* `Telescope` memungkinkan saya mencari teks di seluruh *file* (`live_grep`) atau melompat antar judul (`heading`) dalam dokumen yang panjang, sangat membantu dalam menyusun artikel kompleks.

* **Pengelolaan Catatan & Analisis Data Sederhana (`vimwiki`):**
    ```vim
    Plug 'vimwiki/vimwiki'
    let g:vimwiki_list = [{'path': '~/Notes/', 'syntax': 'markdown', 'ext': '.md'}]
    let g:vimwiki_folding='expr:quick'
    ```
    `vimwiki` adalah "otak kedua" saya. Ini adalah sistem *wiki* pribadi berbasis Markdown yang saya gunakan untuk mengelola semua catatan riset, *outline* wawancara, ide-ide artikel, dan *database* informasi. Saya juga punya *template* khusus untuk menyimpan data primer dari hasil riset akademik, dan informasi itu saling terhubung menggunakan *vimwiki* berdasarkan tema serta isu yang relevan. Dengan mengumpulkan dan menautkan informasi di sini, saya bisa dengan mudah menuliskan latar belakang dari sebuah isu yang sedang saya buat beritanya. Informasi *metadata* juga penting saya catat agar mempermudah pencarian menggunakan berbagai *plugin* Vim. Dengan fitur *folding*, saya bisa dengan mudah mengorganisir dan menavigasi catatan yang semakin bertambah.

* **Pratinjau Markdown (`glow.nvim`):**
    ```vim
    Plug 'ellisonleao/glow.nvim'
    ```
    Sebelum artikel saya terbit, saya sering ingin melihat bagaimana tampilannya. `glow.nvim` memungkinkan saya merender *file* Markdown langsung di *terminal* dengan tampilan yang rapi dan mudah dibaca, mirip seperti *preview* di *website*. Praktis dan cepat!

#### **3. Konfigurasi Standar NeoVim:**

Beberapa pengaturan ini adalah fondasi yang membuat NeoVim berfungsi dengan baik dan mendukung semua fitur di atas.

* `set nocompatible`: Memastikan NeoVim menggunakan fitur modern dan bukan Vi klasik.
* `set noexpandtab` & `set noshiftround`: Memastikan penggunaan tab asli dan *indentasi* yang presisi.
* `set encoding=UTF-8`: Penting untuk mendukung berbagai karakter, termasuk bahasa Indonesia.
* `filetype plugin on` & `syntax on`: Mengaktifkan *plugin* dan penyorotan sintaksis berdasarkan jenis *file*, membuat teks lebih mudah dibaca dan struktur dikenali.
* `set mouse=a`: Mengaktifkan dukungan *mouse*, memberikan fleksibilitas navigasi.
* `set clipboard^=unnamedplus`: Mengintegrasikan *clipboard* sistem, fundamental untuk *copy-paste* antar aplikasi.

#### **4. Konfigurasi Lainnya (dan Sedikit Sentuhan Estetika):**

* `Plug 'itchyny/lightline.vim'`, `Plug 'tpope/vim-sensible'`, `Plug 'stevearc/aerial.nvim'`, `Plug 'nvim-lua/plenary.nvim'`, `Plug 'neoclide/coc.nvim'`, `Plug 'edluffy/hologram.nvim'`: Ini adalah baris `Plug` dari *plugin manager* yang saya gunakan (vim-plug). Mereka mendeklarasikan *plugin* apa saja yang saya instal. `vim-sensible` adalah *plugin* "ramah pengguna" yang menerapkan banyak pengaturan dasar yang direkomendasikan. `aerial.nvim` memberikan *outline* struktur dokumen, `plenary.nvim` adalah *dependency* untuk `telescope`, `coc.nvim` untuk fitur *autocompletion* dan diagnostik (meski jarang dipakai untuk penulisan murni), dan `hologram.nvim` memungkinkan pratinjau gambar di *terminal*.

---

## **Refleksi: Perjalanan Saya dengan FOSS, Linux, dan NeoVim**

Setelah saya membedah detail konfigurasi NeoVim ini, kini saya ingin berbagi sedikit tentang perjalanan yang membawa saya pada pilihan-pilihan teknologi tersebut. NeoVim bukan sekadar alat tulis; ia adalah bagian integral dari cara saya bekerja dan berpikir.

Latar belakang pendidikan SMK Komputer saya, meskipun tidak berlanjut ke jenjang sarjana di bidang serupa, menumbuhkan hobi mendalam terhadap dunia teknologi, khususnya Linux. Awalnya, ketertarikan ini bermula dari kebutuhan yang sangat pragmatis: saya mencari sistem operasi yang ringan dan efisien untuk perangkat berspesifikasi rendah atau usia yang sudah tidak muda lagi, serta tentunya yang ramah di kantong. Linux menawarkan semua itu.

Namun, seiring berjalannya waktu, minat saya berkembang jauh melampaui sekadar aspek fungsional. Saya mulai mendalami filosofi di balik *Free and Open Source Software* (FOSS) dan merasakan semangat kolaborasi yang kuat dari komunitas pengembangnya. Mengonfigurasi NeoVim ini memuaskan hobi saya dan membuka pengalaman baru, seperti belajar *vim script* dan membuat *script bash* sederhana untuk mengotomatisasi berbagai tugas harian.

Tentu, konfigurasi dan *script* ini tidak saya buat dari nol. Sejalan dengan semangat FOSS, saya banyak belajar dan beradaptasi dari karya orang lain. Saya bisa dibilang menjadi seorang "script-kiddie" yang telaten mencari, memahami, dan memodifikasi *script* agar sesuai kebutuhan spesifik pekerjaan saya. Proses belajar ini berkelanjutan dan memuaskan.

Di luar NeoVim, komitmen saya terhadap FOSS juga terlihat dari penggunaan program sumber terbuka lainnya. Newsboat menjadi alat andalan untuk mengikuti perkembangan berita dari berbagai RSS *feed*, sementara ImageMagick membantu saya merekayasa gambar sesuai spesifikasi pengiriman berita di Bisnis Indonesia. Aplikasi seperti Thunderbird dan LibreOffice juga telah menjadi pengganti yang andal untuk program-program komersial. Secara umum, saya terbiasa menjalankan seluruh alur kerja digital saya menggunakan program sumber terbuka dan gratis di lingkungan Linux.

Pengalaman saya dengan NeoVim ini menegaskan satu hal: sebuah alat tidak harus kompleks atau mahal untuk menjadi sangat kuat. Bagi saya, seorang jurnalis yang setiap hari bergelut dengan informasi, penulisan, dan tenggat waktu, NeoVim telah membuktikan diri sebagai mitra yang tak tergantikan.

Keunggulannya terletak pada keringanan, kecepatan, dan kemampuan personalisasi yang hampir tak terbatas. Saya bisa menciptakan *workspace* yang benar-benar sesuai dengan kebutuhan spesifik saya—dari menghitung kata secara otomatis, menyisipkan *template* berita instan, hingga mengelola catatan riset yang kompleks. Dampak yang saya rasakan sangat signifikan. Saya hanya membutuhkan sepersekian detik untuk membuka perangkat dan langsung mengakses dokumen-dokumen saya di NeoVim. Dengan menggunakan Markdown, seluruh dokumen kerja saya, yang terdiri dari naskah berita dan transkrip wawancara, dapat disimpan hanya dalam bentuk *file* berukuran sangat kecil—biasanya hanya 5-10 *file* termasuk catatan referensi di Vimwiki. Informasi yang ringkas dan mudah diakses inilah yang juga sangat membantu saya membuat naskah berita untuk diikutkan ke berbagai lomba dan *workshop* jurnalistik.

Fleksibilitas NeoVim juga menjadi kunci. Ia memungkinkan saya menggunakan satu konfigurasi yang sama di banyak perangkat, mulai dari *shortcut*, *template*, hingga tampilan antarmuka. Ini berarti saya bisa fokus untuk menulis tanpa harus menyesuaikan diri dengan lingkungan kerja yang baru, tak hanya di komputer atau laptop, tetapi juga di *handphone* Android saya.

Meskipun NeoVim identik dengan dunia *programmer*, pengalaman saya menunjukkan bahwa manfaatnya melampaui batas tersebut. Para jurnalis, penulis, peneliti, atau pekerja non-programmer lainnya yang mendambakan efisiensi, kontrol penuh atas lingkungan kerja digital, dan kebebasan dari fitur-fitur yang tidak perlu, dapat menemukan NeoVim sebagai solusi yang sangat relevan. Ia memberdayakan kita untuk bekerja lebih cepat, lebih rapi, dan lebih terfokus, tanpa perlu terbebani oleh *bloatware* atau biaya lisensi. NeoVim adalah bukti bahwa terkadang, yang paling sederhana justru yang paling revolusioner.
