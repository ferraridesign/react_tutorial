$(document).ready(function() {

/* Sortable and Droppable for Items */
/*calls the sortable id to make sure it has access to the
trash box so its able to be removed.*/
	$('#sortable').sortable({
		connectWith: '#trash'
	}).disableSelection();


/*ui- state hover is the css class we are referring when we drag the item to the
drop items to remove box. The trash is creating this droppable option,
it accepts the sortable list, changes the color when you hover to background color of ready
which is from our css file, and a drop action , where the items are laid out.*/
	$('#trash').droppable({
		accept: '#sortable li',
		hoverClass: "ui-state-hover",
		drop: function(event, ui){
			ui.draggable.remove();
		}
	});

	/* Alphabetical Sort */
	$('form#sort').submit(function(event){
		event.preventDefault();
		$('ul#sortable li').sort(function(a, b){
			return ($(b).text().toLowerCase()) < ($(a).text().toLowerCase());
		}).appendTo('ul#sortable');
	});

	/* Use to sort items in order they were added */
	/* --I didn't implement this since users I tested
	on did not find this important or useful

	$('form#main-form').submit(function(event){
		event.preventDefault();
		$( "#sortable" ).sortable('cancel');
	});
	*/

/* input is the tag, check is out class, and its changing when we
press on the checkbox to change its css class to a strikethrough.
this siblings refers to all check class under the input tag. So
whether its one or 10 items you will be able to strikethrough them
if you click the checkbox.*/

/*Checkbox Strikethrough Item Text */
	$('input.check').change(function(){
		$(this).siblings('.item').toggleClass('strike');

		/* This pushes checked items to the bottom of the list */
		/* --This feature was removed since users found it
		jarring when the item they were looking at moved

		if($(this).siblings('.item').hasClass('strike')){
			$(this).closest('li').appendTo('ul#sortable');
		}
		*/
	});

/*in the form tag, look for an id remove-check. Once clicked on the
checkbox in the unordered list with the sortable id, and it has a
class of strike(which is strikethrough) then remove the strike.*/

/* Removing Checked Items */
	$('form#remove-check').submit(function(event){
		event.preventDefault();
		$('ul#sortable li').each(function(){
			if($(this).find('.item').hasClass('strike')){
				$(this).remove();
			}
		});
	});

/*call the span tag, and class item. Make this clickable, by double
clicking the text in order to edit. Once clicked, hide the text that
was originally there. After doing so, create a textarea for me to edit,
and add some text. */
/* Text editing with double-click */
/* --Not using contenteditable=true to have more control */
	$('span.item').dblclick(function(){
		$(this).hide().after('<textarea class="edit" maxlength="140"></textarea>');
		$('textarea.edit').focus();
/*Once I am finished adding in the text, I then call the new tag
textarea, and class edit which I create above. In order to press return
so the new edited area is accepted, we must call an event to say
once someone hits the return button accept it as valid text, and show
it in the span id, and item class. You set it equal to 13 because
that is the ASCII code, which is carriage return and valid in all
operating systems.*/

		/* handles pressing enter in text area */
		$('textarea.edit').keypress(function(event){
			if(event.which == 13){
				event.preventDefault();
				$('span.item').show();

/* if the class of trim, is not valid text, or someone
hit the space bar a couple of time to show whitespace, then do not
accept the edited textarea. This is searching for dirty text, and
if no letters, or number are type and the return button has been pressed.
then return the original value.(Item 1,2, 3, etc)*/
				/* this tests if no text or whitespace was entered */
				if(!$.trim($(this).val())){
					$('textarea.edit').remove();
				} else {
					$(this).siblings('span').html($(this).val());
					$('textarea.edit').remove();
				}
			}
		});

/*in the text area, if you click outside the area, then
return the value from the span id, item class. Should be
the original before you double clicked to create the
textarea.*/
		/* handles clicking outside text area */
		$(document).click(function(event){
			$('span.item').show();

/* if the class of trim, is not valid text, or someone
hit the space bar a couple of time to show whitespace, then do not
accept the edited textarea. This is searching for dirty text, and
if no letters, or number are type and the return button has been pressed.
then return the original value.(Item 1,2, 3, etc)*/

			/* this tests if no text or whitespace was entered */
			if(!$.trim($('textarea.edit').val())){
				$('textarea.edit').remove();
			} else {
				$('textarea.edit').siblings('span').html($('textarea.edit').val());
				$('textarea.edit').remove();
			}

		});

		/*Similar to return, Once I am finished adding in the text,
		I then call the new tag
		textarea, and class edit which I create above. In order to press escape
		so the new edited area is accepted, we must call an event to say
		once someone hits the escape button accept it as valid text, and show
		it in the span id, and item class. You set it equal to 27 because
		that is the ASCII code, which is ESCAPE and valid in all
		operating systems. If there isnt any text, then return it to previous
		text*/
		/* handles escaping out of text area */
		/* --also handles vertical resizing */
		$('textarea.edit').keyup(function(event){
			$(this).height($(this).prop('scrollHeight'));
			if(event.which == 27){
				event.preventDefault();
				$('span.item').show();
				$('textarea.edit').remove();
			}
		});

	});


/*in the input tag, and add id, once someone has type in the
textarea, then call the ASCII code of 13 so they are able
to click the return button. Once clicked the new item will be
dropped in the sortable list.*/
/* Adding Items */
	$('input#add').keypress(function(event){

		if(event.which == 13){
			event.preventDefault();


			/* if the class of trim, is not valid text, or someone
			hit the space bar a couple of time to show whitespace, then do not
			accept the edited textarea. This is searching for dirty text, and
			if no letters, or number are type and the return button has been pressed.
			then dont drop or although it to proceed*/

			/* this tests if no text or whitespace was entered */
			if(!$.trim($(this).val())){
				$('input#add').val('Item');
			}

			$('li#base').clone(true).appendTo('#sortable').removeAttr('id').removeClass('hidden');
			$('ul#sortable>li:last>form>span').text($('input#add').val());
			$('input#add').val("");


/* these two variable are created because once we create the new item
we need the items to have the same style as the other items in the
div tag, and container class. This is based off the size of the
browser window height.*/
			var doc_height = $(document).height();
			var win_height = $(window).height();

			if(doc_height > win_height){
				$('div#container').css('height', 'auto');
			}
		}
	});
});
