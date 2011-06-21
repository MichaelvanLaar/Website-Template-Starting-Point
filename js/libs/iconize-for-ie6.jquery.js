var fileTypes = {
	doc: 'icon_doc',
	txt: 'icon_txt',
	xls: 'icon_xls',
	rss: 'icon_feed',
	opml: 'icon_opml',
	phps: 'icon_phps',
	torrent: 'icon_torrent',
	vcard: 'icon_vcard',
	exe: 'icon_exe',
	dmg: 'icon_dmg',
	pps: 'icon_pps',
	pdf: 'icon_pdf',
	xpi: 'icon_plugin',
	fla: 'icon_flash',
	zip: 'icon_archive',
	rar: 'icon_archive',
	gzip: 'icon_archive',
	bzip: 'icon_archive',
	ace: 'icon_archive',
	ical: 'icon_ical',
	css: 'icon_css',
	ttf: 'icon_ttf',
	jpg: 'icon_pic',
	gif: 'icon_pic',
	png: 'icon_pic',
	bmp: 'icon_pic',
	jpeg: 'icon_pic',
	svg: 'icon_pic',
	eps: 'icon_pic',
	mov: 'icon_film',
	wmv: 'icon_film',
	mp4: 'icon_film',
	avi: 'icon_film',
	mpg: 'icon_film',
	mp3: 'icon_music',
	wav: 'icon_music',
	ogg: 'icon_music',
	wma: 'icon_music',
	m4a: 'icon_music'
};

$(document).ready(function() {

  $('a.iconize').each(function() {
 
    var $a = $(this);
  
    var href = $a.attr('href');
  
    var hrefArray = href.split('.');
    var extension = hrefArray[hrefArray.length - 1];
 
    var image = fileTypes[extension];
  
    if ($a.children('img').size()) { return; }
 
    if (image) {
      $a.addClass(image);
    }
 
  });
  
});