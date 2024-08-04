
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const url = new URL(request.url)
  
  if (request.method === 'GET' && url.pathname.startsWith('/')) {
    const fdato = url.pathname.split('/')[1]
    const fidato = fdato.split('_')
    const folio = fidato[0]
    const monto = fidato[1]
    const date = fidato[2]
    const suc = fidato[3]

    if(monto){
      return new Response (cloner(folio, monto, date, suc), {
        headers: { 
          'Content-Type': 'text/html'
        },
      })
    } else {
        return new Response(getMainPageHtml(), {
            headers: { 'Content-Type': 'text/html' },
          });
    }

  } 
  
  return new Response('Not Founde', { status: 404 })
}

function getMainPageHtml() {
    return `
      <html>
      <head>
      <meta http-equiv="content-type" content="text/html; charset=utf-8" />
      <title>Bywarrior™</title>
      <link rel="SHORTCUT ICON" href="files/images/vngicon.png" type="image/x-icon" />
      <style>
        * { font-family: verdana; font-size: 55pt; COLOR: #black; }
        b { font-weight: bold; }
        table { border: 1px solid gray;}
        td { text-align: center; padding: 25;}
      </style>  
      </head>
      <body>
      <center>
      <div style="margin-top: 250px;">
      <font face=time size=3>Bywarrior™</font><br><br>
      </div>
      </center>
      <script type='text/javascript'>
      $(function(){
          $(document).bind("contextmenu",function(e){
              return false;
          });
      });
      </script>
      </body>
      </html>
    `;
  }


function cloner(folio, Id, date, suc) {
  const tiket = folio
  const monto = Id 
  const fecha = date
  const shop = decodeURIComponent(suc)

  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="utf-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <meta name="author" content="bywarrior">
      <title>kfc cloner</title>
      <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
      <link href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css" rel="stylesheet">
      <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">
      <link href='//fonts.googleapis.com/css?family=Roboto:400,700' rel='stylesheet' type='text/css'>
      <script src="//maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>
      <script> 
      $(document).ready(function () {
        var gen =  'kfc';
        document.title = gen + ' Cloner';
    
        $('#generar').click(function () {
          var cant = $('#cant').val();
          var folio = $("#fol").val();
          var date = $("#date").val();
          var tienda = $("#tienda").val();
          var monto = $("#monto").val();
          var m1 = folio.substring(-16,4);
          var m2 = folio.substring(5,14);

          $('#datos').text('');
          for (var i = 1; i <= cant; i++) {
            var ticket = m1 + rnd(1,9) + m2 + rnd(10,99);
            var enlace = "https://kfc.byw.workers.dev/"+ticket+"_"+monto; 

            $("#datos").append("Live ✅ "+ ticket + "|$"+monto+"|"+date+"|"+tienda+"|"+enlace+" \\n");
             }

        });           
        });
  
        function rnd(x, a) {
          return Math.floor(Math.random() * (a + 1 - x)) + x
      }
      </script>
      <style>
      body { background: #121b1d url(https://drive.google.com/uc?=export=view&id=1D5G1Cr8QATvxfdV_4SD8wQGA0Sn-Q6Sh); font-family: 'Roboto', sans-serif; }
      .list { color: black; font-size: 10px; }
      .panel-red { border: 1px solid #315888; margin: 5px 0; border-top-left-radius: 0; border-top-right-radius: 0; }
      .panel-red>.panel-heading { background-color: #315888; color: #fff; text-align: center; font-weight: bold; font-size: 17px; }
      .panel-red>.panel-footer { background-color: #f1f1f1; }
      .btn { margin-left: 5px; }
      .btn-teal { background-color: #00b5ad; color: #fff; }
      .btn-teal:hover, .btn-teal:active, .btn-teal:focus { background-color: #009c95; color: #fff; }
      .btn-green { background-color: #21ba45; color: #fff; }
      .btn-green:hover, .btn-green:active, .btn-green:focus { background-color: #16ab39; color: #fff; }
      textarea { resize: none; }
      </style>
      <script>
          function saveTextAsFile() {
              var textToWrite = document.getElementById('datos').value;
              var textFileAsBlob = new Blob([textToWrite], { type: 'text/plain' });
              var username = $("#tienda").val();
              var fileNameToSaveAs = username + ".txt";
              var downloadLink = document.createElement("a");
              downloadLink.download = fileNameToSaveAs;
              downloadLink.innerHTML = "Save";
              if (window.webkitURL != null) {
                  downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
              } else {
                  downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
                  downloadLink.onclick = destroyClickedElement;
                  downloadLink.style.display = "none";
                  document.body.appendChild(downloadLink);
              }
              downloadLink.click();
          }
      </script>
  </head>
  <body>
      <div class="container">
          <div class="col-md-8 col-md-offset-2">
              <div class="panel panel-red">
                  <div class="panel-heading">
                      <div class="panel-title">
                          <i class="fa fa-users"></i> kfc cloner
                      </div>
                  </div>
                  <div class="panel-body">
                          <div class="form-group">
                              <div class="col-sm-12">
                                  <div class="input-group">
                                      <span class="input-group-addon">Date</span>
                                      <input id="date" name="fech" class="form-control" placeholder="" type="text" maxlength="8" value="${fecha}" size="2">
                                      <span class="input-group-addon">Ticket</span>
                                      <input id="fol" name="fol" class="form-control" placeholder="" type="text" maxlength="16" value="${tiket}" size="2">
                                  </div>
                              </div>
                              <div class="col-sm-12">
                                  <div class="input-group">
                                      <span class="input-group-addon">Shop</span>
                                      <input id="tienda" name="suc" class="form-control" placeholder="" type="text" maxlength="50" value="${shop}" size="2">
                                  </div>
                              </div>
                              <div class="col-sm-12">
                                  <div class="input-group">
                                      <span class="input-group-addon">Amount</span>
                                      <input id="monto" name="mon" class="form-control" placeholder="" type="text" maxlength="13" value="${monto}" size="2">
                                      <span class="input-group-addon">Quantity</span>
                                      <input id="cant" name="cant" class="form-control" placeholder="" type="text" maxlength="5" value="10" size="3">
                                  </div>
                              </div>
                          </div>
                          <div class="form-group">
                              <label for="emails" class="col-sm-12">
                                  <button type="submit" id="generar" name="generar" class="btn btn-teal pull-right"><i class="fa fa-cog"></i> Generate</button>
                                  <button type="button" name="save" class="btn btn-green pull-right" onclick="saveTextAsFile(); return false;"><i class="fa fa-save"></i> Save</button>
                              </label>
                              <div class="col-sm-12"> 
                                  <textarea rows="10" id="datos" name="datos" class="form-control list"></textarea>
                                  <div class="control-group">
                                      <div class="controls">
                                          <button id="button" name="button" class="btn btn-teal pull-right" onclick="copiarAlPortapapeles('datos'); return false;"><i class="fa fa-copy"></i> Copy</button>
                                          <a id="save" name="save" class="btn btn-info pull-right" onclick="saveTextAsFile(); return false;"><i class="fa fa-arrow-circle-down"></i> Download</a>
                                      </div>
                                  </div>
                              </div>
                          </div>
                  </div>
                  <div class="panel-footer">Made <a href="https://www.facebook.com/bywarriormx">bywarrior</a> for users.</div>
              </div>
          </div>
      </div>
      <script type="text/javascript">
          function copiarAlPortapapeles(id_elemento) {
              var input = document.getElementById(id_elemento);
              input.select();
              document.execCommand("copy");
          }
      </script>
  </body>
  </html>
  `
}
