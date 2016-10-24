$(document).ready(function(){
  var generateIndex = function (bowties) {

    var newElem = ""
    for (var i = 0; i < bowties.length; i++){
      newElem += "<li id='" +
                  bowties[i].id +
                  "'><a data-toggle='modal' href='#myModal'>"+
                  bowties[i].material +
                  " - " +
                  bowties[i].pattern +
                  "</a></li>";
    };

    newElem = "<ul>" + newElem + "</ul>"+
          '<hr><button type="button" data-toggle="modal" data-target="#myModal" id="add">Add New</button>';

    $('body').append(newElem);
  };

  var showOne = function(bowtie) {
    var newElem = '';
    for (key in bowtie){
      newElem += '<div><h5>'+
                 key+
                 '</h5></div>'+
                 '<div><p>'+
                 bowtie[key]+
                 '</p></div>'
    };
    newElem = newElem + '<hr><button id="edit">Edit</button>' + '<button id="delete">Delete</button>';
    $('.modal-body').html('');
    $('.modal-body').append(newElem);
  }

  var editOne = function(bowtie) {
    var newElem = '';
    for (key in bowtie){
      newElem += '<div class="field"><label for="bowtie_'+
                key+
                '">'+
                key+
                '</label><input type="text" name="bowtie['+
                key+
                ']" id="bowtie_'+
                key+
                '" value='+
                bowtie[key]+
                '>'
    };
    newElem = '<form id=editForm>' + newElem + '<hr><button id="update">Update</button>' + '</form>';
    $('.modal-body').html('');
    $('.modal-body').append(newElem);
  };

  $.ajax({
    url: '/api/bowties',
    method: 'get',
    success: function(resp){
      generateIndex(resp);

      $('li').off().click(function(e){
        e.preventDefault();
        var id = this.id
        console.log("this bowties id is " + this.id);
        $.ajax({
          url: '/api/bowties/'+id,
          method: 'get',
          success: function (oneData) {
            showOne(oneData);
            $('#edit').click(function(e){
              console.log('clicked edit '+id);
              editOne(oneData);
              $('#update').click(function(e){
                e.preventDefault();
              $.ajax({
                url: '/api/bowties/'+id,
                method: 'put',
                data: {
                      material: $('#bowtie_material').val(),
                      pattern: $('#bowtie_pattern').val(),
                      style: $('#bowtie_style').val(),
                      wholesale_price: parseFloat($('#bowtie_wholesale price').val()),
                      retail_price: parseFloat($('#bowtie_retail_price').val()),
                      image_url: $('#bowtie_image_url').val()
                    },
                success: function (data){
                  showOne(data);
                }
              })
            });
            });
            $('#delete').click(function(e){
              console.log('clicked delete');
              $.ajax({
                    method: 'DELETE',
                    url: '/api/bowties/' + id
                  }).done(function(){
                    window.location.href = '/bowties'
                  })
            });
          }
        });
      });
    }
  });


});