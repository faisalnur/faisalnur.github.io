---
layout: post
title: Melacak Jejak Hutang Dalam Peradaban Manusia
permalink: /hutang/
---

Membaca Graber adalah sebuah usaha untuk memahami sistem ekonomi yang demikian ruwet dan mengawang-awang, setidaknya buat Saya. Dua tahun lebih bergelut dengan angka statistik dan asumsi ekonom sepertinya belum menjernihkan pikiran Saya soal apa itu ekonomi. Rasa penasaran memang muncul dari kebutuhan pekerjaan yang begitu praktis dan pragmatis. Namun, lebih daripada itu, ada semangat untuk bisa membangun idealisme pribadi yang jauh lebih kokoh dari hari ini. Dengan pondasi dan arah juang yang konkret.

Anarkis berbaju Akademisi asal Amerika Serikat itu membuka cakrawala baru buat Saya. Tentang konsep, ilmu, dan perilaku ekonomi yang tidak melulu soal angka dan statistik. Latar belakang Graeber sebagai seorang Antropolog memang menjadi karakteristik tersendiri. Paparan dan dugaan-dugaannya tak melulu kuantitatif, seperti seorang bankir yang saban hari mengutak atik angka. Justru, Graeber mampu mengungkapkan ekonomi sebagai sebuah gejala sosial. Sebagai penonton yang kemudian mampu menjadi penutur.

Dalam Debt: the First 5.000 Years, Graeber mempertanyakan konsep hutang atau debt dalam peradaban manusia. Temuannya menjungkirbalikkan Ilmu Ekonomi yang diajarkan sekolah dasar, setidaknya di Indonesia. Bahwa kegiatan ekonomi tidak berpusat pada pertukaran barang apalagi uang, tapi justru hutang yang sekaligus jadi penggerak peradaban manusia.

Konsep hutang, menurut Graeber, muncul dalam setiap peradaban kuno manusia. Bahkan, sebelum mengenal uang, Graeber menduga manusia sudah lebih akrab dengan konsep hutang itu sendiri. Pada bagian pertama, On the Experience of Moral Confusion, Graeber secara sederhana membuktikan bahwa bukan cuma manusia modern yang memusingkan tagihan bulanan dan paylater-nya. Bahkan, masyarakat purba sekalipun, sudah akrab memusingkan hutangnya. Lebih lanjut, fenomena pinjam meminjam itu bahkan punya implikasi moral yang tidak sederhana.

	If one looks at the history of debt, then, what one discovers first of all is profound moral confusion. Its most obvious manifestation is that most everywhere, one finds that the majority of human beings hold simultaneously that (1) paying back money one has borrowed is a simple matter of morality, and (2) anyone in the habit of lending money is evil.
	(p.9)

<!-- Import Apex Charts.js -->
<script src="https://cdn.jsdelivr.net/npm/apexcharts"></script>

<!-- Define border of chart -->
<style>
	.chart {
		margin: 20px;
		padding: 20px;
		width: 500px;
		height: auto;
		display: flex;
		justify-content: center;
		align-items: center;
		border: 5px solid rgba(239, 239, 240, 1);
		padding: 5px;
	}
</style>

<!-- Start of ready-to-embed-script -->
<div id="chart" class="chart">
<script>
	var options = {
		series: [{
			name: "Laju Pertumbuhan Ekonomi",
      type: 'line',
			data: [
				{
				x: '2018',
				y: 5.30
				},{
				x: '2019',
				y: 5.36
				},{
				x: '2020',
				y: -2.65
        },{
        x: '2021',
        y: 3.33
				}]
		},{
			name: "Proyeksi Bank Indonesia",
      type: 'rangeArea',
			data: [
				{
				x: '2018',
				y: 5.30
				},{
				x: '2019',
				y: 5.36
				},{
				x: '2020',
				y: -2.65
				},{
        x: '2021',
        y: 3.33
        },{
          x: '2022',
				  y: [4.5, 5.3]
				}]
		}
            ],
		
		chart: {
			height: 350,
			type: 'rangeArea',
			zoom: {
				enabled: false
			}
		},
		
		dataLabels: {
			enabled: false
		},
		
		stroke: {
			curve: 'smooth',
      width: [4, 3],
      lineCap: 'round'
		},
		
		title: {
			text: 'Laju Pertumbuhan Ekonomi di Jawa Tengah (2011-2023)',
			align: 'center'
		},
    fill: {
          type: ['solid', 'pattern'],
          pattern: {
            style: 'verticalLines',
            width: 3,
            height: 3,
            strokeWidth: 1,
            },
        },
    
		grid: {
			row: {
				colors: ['white', 'transparent'],
				opacity: 0.5
			},
		},
      theme: {
      mode: 'light', 
      palette: 'palette2', 
  }
			
	};
	
	var chart = new ApexCharts(document.querySelector("#chart"), options);
	chart.render(); 
	
</script>
</div>


