/*Calculate size of header*/
function setHeaderSize () {
	var vh = $(window).height();
	var descriptionHeight = $('#site-header .description').height();

	$('#site-header').height(Math.max(vh, (descriptionHeight + vh * 40 / 100)));
	$('#site-header .overlay').height(Math.max(vh, (descriptionHeight + vh * 40 / 100)));
}

/*Set images centerd in their container*/
function centerImg() {
	$('.img-container').each( function (id, el) {
		el = $(el);
		var img = el.find('img');

		if (img.width() < el.width())
		{
			img.addClass('img-h-stretch');
			img.css('margin-left', 0);
		}
		else {
			img.removeClass('img-h-stretch')
			var gap = ( img.width() - el.width() ) / 2;
			img.css('margin-left', -gap);
		}

		if (img.height() < el.height()) {
			img.addClass('img-v-stretch')
			img.css('margin-top', 0);
		} else {
			img.removeClass('img-v-stretch');
			var gap = ( img.height() - el.height()) / 2;
			img.css('margin-top', -gap);
		}
	});
}

/*Load project data for the modal dialog*/
function loadData(projectId) {
	var project = $('#' + projectId );
	var data = {
		name: project.find('h3').text(),
		description: project.find('.project-desc').html(),
		tagList: project.find('.tag-list').html(),
		meta: project.find('.meta-data').html(),
		url: project.find('.project-url').attr('href'),
		src: project.find('.project-src').attr('href'),
		img: project.find('img').attr('src'),
	}

	return data;
}

function renderModal(modalId, data) {
	var modal = $('#' + modalId);

	modal.find('.modal-title').text(data.name);
	modal.find('.modal-body .project-desc').html(data.description);
	modal.find('img').attr('src', data.img);
	modal.find('.tag-list').html(data.tagList);
	modal.find('.meta-data').html(data.meta);
	modal.find('.project-url').attr('href', data.url);
	if(typeof data.src != 'undefined')
	{
		modal.find('.project-src').attr('href', data.src)
		modal.find('.project-src').removeClass('d-none');
	}
	else
		modal.find('.project-src').addClass('d-none');
}

function getNavHeight() {
	return $('#site-nav').outerHeight();
}

function updateScrollOffset() {
	var spied = $('body');
	if (typeof spied.scrollspy() != 'undefined')
		spied.scrollspy('dispose');

	spied.scrollspy({target: '#site-nav', offset: getNavHeight()});
}

$('#project-popup').on('show.bs.modal', function(event) {
	var projectId = $(event.relatedTarget).data('project');
	var modalId = $(this).attr('id');
	var data = loadData(projectId);
	console.log(data);
	renderModal(modalId, data);
});

$('.navbar a, #site-header a').on('click', function(e) {
	//e.preventDefault();
	$('body, html').animate({
		scrollTop: $($(this).attr('href')).offset().top + 1 - getNavHeight()
	}, 1000);
});

$(window).on('resize', function() {
	updateScrollOffset();
	setHeaderSize();
	centerImg();
});

$(document).ready( function() {
	updateScrollOffset();
	setHeaderSize();
	centerImg();
});
