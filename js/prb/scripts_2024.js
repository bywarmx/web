/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

var opFranq='';
var arrStores = new Array();
var arrJul = new Array();
var lsTicketAmount=0;
var lsBrandId='';
$(document).ready(function(){
    $('[data-toggle="popover"]').popover({
        html : true,
        title : 'Folio para Facturar <a href="#" class="close" data-dismiss="alert">X</a>',
        content : '<img src=Imagenes/ticket.png width="450px" >',
        container: 'body'
       
    });
    $(document).on("click", ".popover .close" , function(){
        $(this).parents(".popover").popover('hide');
    });
});
$(document).ready(function(){
    $('[data-toggle="popoverPrb"]').popover({
        html : true,
        title : 'Ejemplo de Constancia <a href="#" class="close" data-dismiss="alert">X</a>',
        content : '<img src=Imagenes/sat_prb.png width="500px" >',
        container: 'body'
    });
    $(document).on("click", ".popover .close" , function(){
        $(this).parents(".popover").popover('hide');
    });
});
$(document).ready(function(){
    $('[data-toggle="popoverDesir"]').popover({
        html : true,
        title : 'Ejemplo de Constancia <a href="#" class="close" data-dismiss="alert">X</a>',
        content : '<img src=Imagenes/sat_desir.PNG width="500px" >',
        container: 'body'
    });
    $(document).on("click", ".popover .close" , function(){
        $(this).parents(".popover").popover('hide');
    });
});
$(document).ready(function(){
    $('[data-toggle="popoverCPPrb"]').popover({
        html : true,
        title : 'Ejemplo de Constancia <a href="#" class="close" data-dismiss="alert">X</a>',
        content : '<img src=Imagenes/cp_prb.png width="450px" >',
        container: 'body'
    });
    $(document).on("click", ".popover .close" , function(){
        $(this).parents(".popover").popover('hide');
    });
});
$(document).ready(function(){
    $('[data-toggle="popoverCPDesir"]').popover({
        html : true,
        title : 'Ejemplo de Constancia <a href="#" class="close" data-dismiss="alert">X</a>',
        content : '<img src=Imagenes/cp_desir.png width="450px" >',
        container: 'body'
    });
    $(document).on("click", ".popover .close" , function(){
        $(this).parents(".popover").popover('hide');
    });
});
function trim(psStringToTrim) {
    var lsStringToTrim=escape(psStringToTrim);
    return unescape(lsStringToTrim.replace(/^\s+|\s+$/g, ''));
};
function getZipData(){
    var zip = document.getElementById('txtZip').value
    var entity = document.getElementById('txtEntity')
    if(zip.length < 5){
        entity.disabled=false
    }
    else if(zip.length == 5){
        entity.disabled=true
        var loText =''; 
        if (window.XMLHttpRequest) {
            xmlhttp = new XMLHttpRequest();
        } else {
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }                      
        xmlhttp.onreadystatechange = function() {                       
            if (xmlhttp.readyState == 4) {                                                                                            
                var loText = trim(xmlhttp.responseText);                                   
                if (loText.replace(/^\s+|\s+$/g, '')!=''){
                    var arrText = loText.replace(/^\s+|\s+$/g, '').split("$");
                    $('#txtEntity').val(arrText[1]);
                    document.getElementById('txtCity').value=arrText[2]
                    document.getElementById('txtDel').value=arrText[3]
                }else{
                    alert('Error en el Codigo Postal, favor de verificarlo.');
                    document.getElementById('txtZip').value=''
                    entity.disabled=false
                }
            }
        }    
        xmlhttp.open("GET", "CheckZip.jsp?zip_id="+zip, true);
        xmlhttp.send(null);
    }
    
};
function disGen(){
    $('#cargando').modal('show');
};

function clnINE(){
    document.getElementById('cmbProcess').selectedIndex=0;
    processEnable('');
    changeINEClient();
};
function changeINEClient(){
    $('#miventana2').modal('hide')
    var delay=500; //0.5 second
    setTimeout(function() {
        $('#miventana3').modal('show')
    }, delay);
};
function retDivClient(){
    var lbValue = false;
    var tpro = document.getElementById("cmbProcess").value;
    var tcom = document.getElementById("cmbComite").value;
    var tamb = document.getElementById("cmbField").value;
    var tent = document.getElementById("cmbINEEntity").value;
    var icon = document.getElementById("txtIdConta").value;
    var ineConta = document.getElementById("txtIdConta").value;
    if(tpro != 'Ordinario'){
        if(tamb == '')
            alert("Verifica que los campos requeridos esten completos")
        else if(tent == ''){
            alert("Verifica que los campos requeridos esten completos")
        }
        else{
            lbValue = true;
            //changeINEClient();
        }
    }else {
        if(tcom == ''){
            alert("Verifica que los campos requeridos esten completos")
        }else if(tcom == 'Directivo Estatal'){
            if(tent == ''){
                alert("Verifica que los campos requeridos esten completos")
            }else{
                lbValue = true;
                //changeINEClient();
            }
        }else if(tcom == 'Ejecutivo Estatal'){
            if (tent == ''){
                alert("Verifica que los campos requeridos esten completos")
            }else{
                lbValue = true;
                //changeINEClient();
            }
        }else if(tcom == 'Ejecutivo Nacional'){
            lbValue = true;
            //changeINEClient();
        }
    }
    if(ineConta != "" && isNaN(ineConta)){
        alert("El Id de Contabilidad debe de ser numérico");
        lbValue = false;
    }
    if(lbValue){
        changeINEClient();
    }
};
function openDivINE(){
    $('#miventana3').modal('hide')
    var delay=500; //0.5 second
    setTimeout(function() {
        $('#miventana2').modal('show')
    }, delay);
    
};
function validFolio(psType,lsFolio){
    
    if (validStore(lsFolio)){			 
        alert('Es posible que sea Franquicia porfavor ponerse en contacto con la sucursal');
        return(false);            
    }                 
    if (!validFolioVigency(lsFolio)){
        alert('No se puede facturar un ticket con m\u00E1s de 90 d\u00EDas de vigencia.');
        return(false); 
    }

    if (psType!='G')
        return(true);
			

    var psParam=lsFolio;
    if (psParam.length==13){
        var loArray=new Array(12);
        loArray[0]=2;
        loArray[1]=3;
        loArray[2]=4;
        loArray[3]=5;
        loArray[4]=6;
        loArray[5]=7;
        loArray[6]=2;
        loArray[7]=3;
        loArray[8]=4;
        loArray[9]=5;
        loArray[10]=6;
        loArray[11]=7;

        var liTotal=0;
        var liCount=0;
        for (i=psParam.length-2;i>=0;i--){
            liTotal=liTotal+psParam.charAt(i)*loArray[liCount];
            //alert(psParam.charAt(i)*loArray[liCount]);
            //alert(liTotal);
            liCount=liCount+1;
        }
        liVerif=liTotal%11;

        if (liVerif==11)
            liVerif=0;
        else if (liVerif==10)
            liVerif=9;
        
        if (liVerif==psParam.charAt(12))
            return(true);
        else{
            alert('Folio inválido, favor de verificarlo');
            return(false);
        }
    }else if (psParam.length==16){
        var loArray=new Array(7);
        loArray[0]=9;
        loArray[1]=8;
        loArray[2]=7;
        loArray[3]=6;
        loArray[4]=5;
        loArray[5]=4;
        loArray[6]=3;
			
        var liTotal=0;
        var liCount=0;
        var lsString1=psParam.substring(0,7);
        var lsString2=psParam.substring(7,14);						
        for (i=0;i<=6;i++){
            //alert((lsString1.charAt(i)+'+'+lsString2.charAt(i))+'*'+loArray[liCount]);				
            //alert((parseInt(lsString1.charAt(i))+parseInt(lsString2.charAt(i)))*parseInt(loArray[liCount]));			
            liTotal=liTotal+(parseInt(lsString1.charAt(i))+parseInt(lsString2.charAt(i)))*parseInt(loArray[liCount]);
            //alert(psParam.charAt(i)*loArray[liCount]);
            //alert(liTotal);
            liCount=liCount+1;
        }
        liVerif=liTotal%100;	
        //if (parseInt(liVerif.toString())==parseInt(psParam.charAt(14)+psParam.charAt(15)))                        
        if (parseInt(liVerif.toString())==parseInt(psParam.charAt(14)+psParam.charAt(15),10))
            return(true);
        else{
            alert('Folio inválido, favor de verificarlo');
            return(false);		
        }
    }else{ /* El ticket no tiene ni 13 ni 16	*/
        alert('Folio inválido, favor de verificarlo');		
        return(false);
    }
};
function validStoreTax11(psFolio){
    var lsStoreTax11List='<%=msStoreTax11%>';
    var lsCurrentYear='<%=msCurrYear%>';      
    var lsStore=psFolio.substring(1,4);   
    var lsDay='';        
    var lsYear='';   
    if (lsStoreTax11List.indexOf(lsStore)>=0){
        if (psFolio.length==13){
            var lsYear=parseInt(psFolio.substring(7,9))+2000;  
        }else{
            var lsYear=parseInt(psFolio.substring(9,11))+2000; 		
        }
        if (parseInt(lsCurrentYear)>=2014 && parseInt(lsYear)<=2013){
            alert('Estimado Cliente: Derivado del cambio en la tasa del IVA en la región fronteriza, los comprobantes fiscales del 2013 debieron facturarse a más tardar el 31 de diciembre del 2013 como se indica en el ticket.Después de esa fecha no será posible generar la factura correspondiente.');
            return(false);                
        }          
    }           
    return(true);
};
function ticketContinue(){
    var lsFlag
    var lsAmount
    var lsFolio
    var lsFolioList=''
    var msDuplicateFolio=''
    
    if (validMultiTicket()){
        showLoadingGen();
        var folio0 = document.getElementById("txtTicket0").value;
        var amount0 = document.getElementById("txtAmount0").value;
        var folio1 = document.getElementById("txtTicket1").value;
        var amount1 = document.getElementById("txtAmount1").value;
        var folio2 = document.getElementById("txtTicket2").value;
        var amount2 = document.getElementById("txtAmount2").value;
        var folio3 = document.getElementById("txtTicket3").value;
        var amount3 = document.getElementById("txtAmount3").value;
        var folio4 = document.getElementById("txtTicket4").value;
        var amount4 = document.getElementById("txtAmount4").value;
        var folio5 = document.getElementById("txtTicket5").value;
        var amount5 = document.getElementById("txtAmount5").value;
        var folio6 = document.getElementById("txtTicket6").value;
        var amount6 = document.getElementById("txtAmount6").value;
        var folio7 = document.getElementById("txtTicket7").value;
        var amount7 = document.getElementById("txtAmount7").value;
        var folio8 = document.getElementById("txtTicket8").value;
        var amount8 = document.getElementById("txtAmount8").value;
        var folio9 = document.getElementById("txtTicket9").value;
        var amount9 = document.getElementById("txtAmount9").value;
        var loText =''; 
        if (window.XMLHttpRequest) {
            xmlhttp = new XMLHttpRequest();
        } else {
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }                      
        xmlhttp.onreadystatechange = function() {                       
            if (xmlhttp.readyState == 4) {                                                                                            
                var loText = trim(xmlhttp.responseText);                                   
                if (loText!=''){
                    var arrText = loText.replace(/^\s+|\s+$/g, '').split("###")
                    msDuplicateFolio = arrText[1];
                    var op = arrText[0].split(",");
                    var lsFlag  = op[0];
                    var lsAmount = op[1];
                    var lsFolio = op[2];
                    for(var a = 3; a<op.length ; a++){
                        if(a==3)
                            lsFolioList = lsFolioList + op[a]
                        else
                            lsFolioList = lsFolioList + "," + op[a]
                    }
                    if (lsFlag=='0') {                 
                        setMultiAmount(lsAmount,lsFolio,lsFolioList);
                        lsTicketAmount = lsAmount
                        $('#miventana').modal('hide')
                    }else if (lsFlag=='1') {       
                        alert("El monto capturado del folio ["+msDuplicateFolio+"] no cuadra con el ticket");
                    }else if (lsFlag=='2') {       
                        alert("El folio ["+msDuplicateFolio+"] no puede ser facturado debido a que se encuentra referenciado en un pago");
                    }else if (lsFlag=='3') {       
                        alert("El folio ["+msDuplicateFolio+"] ya ha sido facturado");
                    }
                    else if (lsFlag=='4') {       
                        alert("El folio ["+msDuplicateFolio+"] ya no puede ser facturado debido a su antigüedad");
                    }
                    else if (lsFlag=='5') {       
                        alert("El folio ["+msDuplicateFolio+"] se encuentra duplicado en la lista");
                    }
                }else
                    alert('Error en el folio, favor de verificarlo.');
                
                hideLoadingGen();
            }
            
        }    
        xmlhttp.open("GET", "Multi.jsp?txtTicket0="+folio0+"&txtAmount0="+amount0+"&txtTicket1="+folio1+"&txtAmount1="+amount1+"&txtTicket2="+folio2+"&txtAmount2="+amount2+"&txtTicket3="+folio3+"&txtAmount3="+amount3+"&txtTicket4="+folio4+"&txtAmount4="+amount4+"&txtTicket5="+folio5+"&txtAmount5="+amount5+"&txtTicket6="+folio6+"&txtAmount6="+amount6+"&txtTicket7="+folio7+"&txtAmount7="+amount7+"&txtTicket8="+folio8+"&txtAmount8="+amount8+"&txtTicket9="+folio9+"&txtAmount9="+amount9, true);
        xmlhttp.send(null);
        
    }
};
function cancelMultiTicket(){
    $('#miventana').modal('hide');
    for(var li=0;li<10;li++){
        document.getElementById("txtTicket"+li).value = "";
        document.getElementById("txtAmount"+li).value = "";
    }
    preloadTicketAmount();
}
function validMultiTicket(){
    //alert('validMultiTicket');
    var lsStore=''; 
    var lsFolio='';
    var lbControl = true;
    for(var i=0;i<10;i++){         
        if (document.getElementById('txtTicket'+i).value!=''){
            lsFolio=document.getElementById('txtTicket'+i).value;
            var lsTotal=document.getElementById('txtAmount'+i);
            if(lsTotal.value == ""){
                alert("El monto no puede estar vacío");
                lbControl=false;
            }
            if(!validStoreTax11(lsFolio)){
                lbControl=false;
            }                
            if (i==0){
                lsStore=lsFolio.substring(0,4);
            }
            else
            if (lsStore!=lsFolio.substring(0,4)){
                alert('Todos los tickets deben de pertenecer al mismo restaurante, favor de verificarlo.');
                document.getElementById('txtTicket'+i).value='';
                document.getElementById('txtAmount'+i).value='';                   
                document.getElementById('txtTicket'+i).focus;                          
                lbControl=false;
            }
            if (!validFolio('G',document.getElementById('txtTicket'+i).value)){
                //alert('Folio inválido, favor de verificarlo.');
                if(i>0){
                    document.getElementById('txtTicket'+i).value='';
                    document.getElementById('txtAmount'+i).value='';                   
                    document.getElementById('txtTicket'+i).focus();                   
                }
                lbControl=false;
            }
        }else{
            if (i==0){
                alert('Favor de ingresar al menos un folio.');
                lbControl=false;
            }
        }      
    }
    return(lbControl);           
};
function chk_CancelInvoice(){
    if(document.getElementById("cmbCancelReason").value != ""){
        if(document.getElementById("txtRFC") != "" && document.getElementById("txtFolio") != ""){
            if(validRfc(document.getElementById("txtRFC"))){
                checkRFCTicket();
                /*if(checkRFCTicket()){
                    if(confirm("Esta seguro que desea cancelar la factura ?")){
                        document.frmMaster.submit()
                    }
                }*/
            }
        }
    } else {
        alert("Por favor indica el motivo de la cancelación");
    }
};


function checkRFC_m(){
    document.getElementById('txtFolio').disable="false"
    var txtFolio = document.getElementById('txtFolio').value;
    var loText='';
    var txtRFC = document.getElementById('txtRFC').value;
    if (window.XMLHttpRequest) {  
            
        xmlhttp = new XMLHttpRequest();
    } else {                                           
            
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }                      
    xmlhttp.onreadystatechange = function() {                       
        if (xmlhttp.readyState == 4) { 
            var loText = trim(xmlhttp.responseText);                                   
            if (loText!=''){
                //document.getElementById("txtRFC").value=loText.replace(/^\s+|\s+$/g, '')
                //alert(loText.replace(/^\s+|\s+$/g, ''));
                if(loText.replace(/^\s+|\s+$/g, '')==txtRFC){
                    //document.frmMaster.submit();
                    document.getElementById("btnXML").style.display = 'inline'
                    document.getElementById("btnPDF").style.display = 'inline'
                    document.getElementById("txtFolio").disabled = true;
                    document.getElementById("txtRFC").disabled = true;
                    document.getElementById("btnSend").style.display = 'none'
                }else {
                        
                    alert('El RFC no esta relacionado con el Folio de ticket');
                    document.getElementById("btnXML").style.display = 'none'
                    document.getElementById("btnPDF").style.display = 'none'
                    document.getElementById("btnSend").style.display = 'inline'
                    document.getElementById('txtRFC').value='';
                }
            } 
                    
        }
    }    
    xmlhttp.open("GET", "InvoiceRFCData.jsp?txtFolio="+txtFolio, true);
    xmlhttp.send(null);
    return(loText);
};
function returnIndex(){
    window.location="index.jsp"
};
function sendResend(psType){        
    
    var lsRfc=document.getElementById('txtRFC').value;
    var lsTicket=document.getElementById('txtFolio').value;
    document.location='Resend.jsp?psType='+psType+"&txtRFC="+lsRfc.replace("&","%26")+"&txtFolio="+lsTicket;                   
       
    lsRfc=lsRfc.replace('&','@');
    document.frmMaster.action = 'Resend.jsp?psType='+psType+"&txtRFC="+lsRfc+"&txtFolio="+lsTicket;
    document.frmMaster.target=  'ifrDetail';
//document.frmMaster.submit();
};

/*añdkfjaskjfhasdlkjfhaslkfhasijfhaslkfas*/
function chk_SeeTicket(){
    if(validRfc(document.getElementById("txtRFC").value))
        checkRFC_m()
    
};

function checkRFCTicket(){
    var folio = document.getElementById("txtFolio").value;
    var rfc = document.getElementById("txtRFC").value;
    if(folio != "" && rfc != ""){
        var loText =''; 
        if (window.XMLHttpRequest) {                  
            xmlhttp = new XMLHttpRequest();
        } else {                                           
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }                      
        xmlhttp.onreadystatechange = function() {                       
            if (xmlhttp.readyState == 4) {                                                                                            
                var loText = trim(xmlhttp.responseText);
                if (loText!=''){
                    var arrText = loText.replace(/^\s+|\s+$/g, '').split("##")
                    if(arrText[2] != rfc){
                        alert("El Ticket no se encuentra relacionado con este RFC, por favor verifica el RFC que aparece en el documento de la factura que deseas cancelar")
                        document.getElementById("txtRFC").value="";
                        return false;
                    } else {
                        if(confirm("Esta seguro que desea cancelar la factura ?")){
                            showLoading();
                            document.frmMaster.submit()
                        }
                    }
                }else{
                    alert('Error en el RFC, favor de verificarlo.');
                    return false;
                }
            }
        }    
        xmlhttp.open("GET", "GetRFC.jsp?txtFolio="+folio, true);
        xmlhttp.send(null);
        $('#miventana3').modal('show')
        //return(loText);
        return true;
    }
    else{
        alert("No puede continuar Faltan datos por llenar")
        return false;
    }
};
var canMulti = 1;
function adddelMulti(a){
    if(a.name == "addMulti"){
        canMulti++
        if(canMulti == 10){
            canMulti = 9
            alert("Solo Pueden ser 10 Tickets a la Vez")
        }
    }
    var name = "divMulti"+canMulti
    document.getElementById(name).classList.toggle("hide")
    document.getElementById(name).classList.toggle("show")
    if(a.name == "delMulti"){
        canMulti--
        if(canMulti == 0){
            canMulti = 1
            alert("Minimo deben ser 2 tickets")
        }
    }
    if(canMulti <= 1){
        document.getElementById("addMulti").classList.add("show")
        document.getElementById("addMulti").classList.remove("hide")
        document.getElementById("delMulti").classList.add("hide")
        document.getElementById("delMulti").classList.remove("show")
    }else if(canMulti >= 9){
        document.getElementById("addMulti").classList.add("hide")
        document.getElementById("addMulti").classList.remove("show")
        document.getElementById("delMulti").classList.add("show")
        document.getElementById("delMulti").classList.remove("hide")
    }
    if(canMulti >=2 && canMulti <= 8){
        document.getElementById("addMulti").classList.add("show")
        document.getElementById("addMulti").classList.remove("hide")
        document.getElementById("delMulti").classList.add("show")
        document.getElementById("delMulti").classList.remove("hide")
    }
}

function showLoading(){
    var loObj = parent.document.getElementById("divLoading");
    if(typeof loObj != "undefined" && loObj != null)
        parent.document.getElementById("divLoading").style.visibility="visible";
}
function hideLoading(){
    var loObj = parent.document.getElementById("divLoading");
    if(typeof loObj != "undefined" && loObj != null)
        parent.document.getElementById("divLoading").style.visibility="hidden";
}

function showLoadingGen(){
    console.log("entro show loading");
    var loObj = document.getElementById("divLoadingGen");
    if(typeof loObj != "undefined" && loObj != null)
        document.getElementById("divLoadingGen").style.visibility="visible";
}
function hideLoadingGen(){
    console.log("entro hide loading");
    var loObj = document.getElementById("divLoadingGen");
    if(typeof loObj != "undefined" && loObj != null){
        console.log("entro hide loading");
        document.getElementById("divLoadingGen").style.visibility="hidden";
    }
}
function divOpenConfMail(){
    
    var txtRFC = document.getElementById("txtRFC").value
    var txtClient = document.getElementById("txtClient").value
    var txtCountry = document.getElementById("txtCountry").value
    var txtEntity = document.getElementById("txtEntity").value
    var txtCity = document.getElementById("txtCity").value
    var txtDel = document.getElementById("txtDel").value
    var txtNeigh = document.getElementById("txtNeigh").value
    var txtStreet = document.getElementById("txtStreet").value
    var txtOutp = document.getElementById("txtOut").value
    var txtIn = document.getElementById("txtIn").value
    var txtZip = document.getElementById("txtZip").value
    var txtPay = document.getElementById("cmbPaymentMethod").value
    var txtNpay = document.getElementById("txtAccountNum").value
    var cmbRecReg = document.getElementById("cmbRecReg").value
    if(txtClient == ""){
        alert("Por favor ingresa el nombre o razón social");
        document.getElementById("txtClient").focus();
        return false;
    }
    else if (txtZip==''){              
        document.frmMaster.txtZip.focus();  
        alert('Debe ingresar el código postal');                    
        return(false);
    }
    else if (cmbRecReg ==''){              
        document.frmMaster.cmbRecReg.focus();  
        alert('Debe ingresar el régimen fiscal');                    
        return(false);
    }
    /*
    if(txtPay == "04" || txtPay == "28"){
        if(txtNpay.replace(" ","").length != 4){
            alert("Por favor ingresa los ultimos 4 digitos de la tarjeta con la que se hizo el pago.");
            return false;
        }
    } else {
        document.getElementById("txtAccountNum").value = "";
    }*/
    
    if (txtClient != "" && confirm('Esta seguro que los datos son correctos?')){
        showLoading();
        //alert("En breve recibiras la factura en tu correo.Para futuras aclaraciones, te pedimos que conserves tu ticket de venta. Para tu comodidad, ponemos a tu disposicion la descarga de la factura a traves de la opcion de consulta 2 horas despues de haberse generado .")
        //$('#miventana3').modal('hide')
        //$('#cargando').modal('show')
        //alert("Variable "+ txtClient)
        document.getElementById('txtFolio').disabled=false;
        $("#divLoading").show();
        document.frmMaster.submit();
        
    }
};
function chkPayment(){
    var pay = document.getElementById("cmbPaymentMethod").value
    if(pay == 04 || pay == 28){
        document.getElementById("txtAccountNum").style.visibility="hidden"
        document.getElementById("labAccountNum").style.visibility="hidden"
        //alert("Ingresa los ultimos 4 digitos de la tarjeta con la que se hizo el pago.")
    }
    else{
        document.getElementById("txtAccountNum").style.visibility="hidden"
        document.getElementById("labAccountNum").style.visibility="hidden"
    }
};
function chkRFC(){
    if (confirm('Esta seguro que los datos son correctos?  Una vez generada la factura, ya no hay posibilidad de corregirla; se debe cancelar y generar una nueva.')){
        $('#miventana4').modal('hide')
        $('#miventana5').modal('show') 
        document.frmMaster.submit()
    }
};
function putZero(){
    var amount = document.getElementById('txtAmount').value
    var chk
    if((amount[amount.length-3]+amount[amount.length-2]+amount[amount.length-1]) == ".00"){
        chk = true
    }
    else
        chk = false
    if(amount != "" && amount % 1 == 0 && chk == false){
        document.getElementById('txtAmount').value = document.getElementById('txtAmount').value.concat(".00")
    }else if (amount != "" && chk == false && amount[amount.length-1] == "0"){
        document.getElementById('txtAmount').value = amount.substring(0,amount.length-1)
    }
    var lsamount = lsTicketAmount.replace(/^\s+|\s+$/g, '')
    if((lsamount[lsamount.length-3]+lsamount[lsamount.length-2]+lsamount[lsamount.length-1]) == ".00"){
        chk = true
    }
    else
        chk = false
    if(lsamount != "" && lsamount % 1 == 0 && chk == false){
        lsTicketAmount = lsTicketAmount.concat(".00")
    }
};
function openDivClient(){
    var folio = document.getElementById("txtFolio").value;
    var rfc = document.getElementById("txtRFC").value;
    var amount = document.getElementById("txtAmount").value;
    var mail = document.getElementById("txtEmail").value;
    var chkmail = document.getElementById("txtChkMail").value;
    var loCFDIUse = document.getElementById("cmbCFDIUse").value;
    if(validRfc(rfc)){
        
        if(parseFloat(lsTicketAmount.replace(/^\s+|\s+$/g, '')) != parseFloat(amount)){
            alert("El monto ingresado no Coincide con El Ticket, verifique no incluir Propina")
            document.frmMaster.txtAmount.value=""
        }else{
            if(mail.toLowerCase() != chkmail.toLowerCase()){
                alert("Por favor verifique que el correo sea el mismo en los dos campos.")
            } else if(folio != "" && rfc != "" && amount != "" && mail != "" && loCFDIUse != ""){
                
                if(rfc.length === 12){
                    alert("Estimado cliente, le informamos que con la nueva versi\u00F3n del SAT:\n\n*Deber\u00E1 ingresar la Raz\u00F3n social sin el r\u00E9gimen de capital.\n*El C\u00F3digo Postal.\n*Seleccionar el r\u00E9gimen fiscal.\n\nTal cual se encuentra en la Constancia fiscal, o no se generar\u00E1 la factura.")
                }
                
                if(rfc.length === 13){
                    alert("Estimado cliente, le informamos que con la nueva versi\u00F3n del SAT:\n\n*Deber\u00E1 ingresar el nombre.\n*El C\u00F3digo Postal.\n*Seleccionar el r\u00E9gimen fiscal.\n\nTal cual se encuentra en la Constancia fiscal, o no se generar\u00E1 la factura.")
                }
                
                var loText =''; 
                if (window.XMLHttpRequest) {                  
                    xmlhttp = new XMLHttpRequest();
                } else {                                           
                    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
                }                      
                xmlhttp.onreadystatechange = function() {                       
                    if (xmlhttp.readyState == 4) { 
                        var loText = trim(xmlhttp.responseText);                                   
                        if (loText!=''){
                            var arrText = loText.replace(/^\s+|\s+$/g, '').split("##");
                            document.getElementById("txtClient").value=arrText[1];
                            document.getElementById("txtCountry").value=arrText[3];
                            document.getElementById("txtEntity").value=arrText[4];
                            document.getElementById("txtCity").value=arrText[5];
                            document.getElementById("txtDel").value=arrText[6];
                            document.getElementById("txtNeigh").value=arrText[7];
                            document.getElementById("txtStreet").value=arrText[8];
                            document.getElementById("txtOut").value=arrText[9];
                            document.getElementById("txtIn").value=arrText[10];
                            document.getElementById("txtZip").value=arrText[11];
                            document.getElementById("cmbRecReg").value=arrText[16];
                        }else
                            alert('Error en el folio, favor de verificarlo.');
                    }
                }    
                xmlhttp.open("GET", "GetClient.jsp?txtRFC="+rfc, true);
                xmlhttp.send(null);
                $('#miventana3').modal('show')
                return(loText);
            } else{
                alert("No puede continuar aun faltan datos por llenar")
            }
        }
    }
        
};
function chkMyFolio(){
    var folio = document.getElementById('txtFolio').value
    var store = folio.substring(1,4).toString()
    var pay = folio.charAt(4)
    var ticket = folio.substring(5,9)
    var year = folio.substring(9,11)
    var date = folio.substring(11,14)
    var verif = folio.substring(14,16)
    var i
    var suma = 0
    
    
    cadena = '0'+store.toString()+pay.toString()+ticket.toString()+year.toString()+date.toString()
    
    alert(cadena)
    
    for(i=0;i<7;i++){
        suma=((((cadena.charAt(i)))+(cadena.charAt(i+7)))*(9-i))
    }
    var dVer = suma%100
    
    alert(dVer/10)
    
    alert(dVer%10)
    
    if(typeof(arrStores[store]) == "undefined"){
        return false
    }else if(pay != 0 && pay != 1){
        return false
    }else if(ticket <= 0 || ticket > 9999){
        return false
    }else if(year > 16){
        return false
    }else if(date < 1 || date > 366){
        return false
    }else{
        return true
    }
   
};
function checkFolio(piCheck){
    
    var folio = document.frmMaster.txtFolio.value
    var folio = folio.replace(" ","");
    if(folio.length == 2 && ((folio.charAt(0) == 'A' && folio.charAt(1) == 'D') || (folio.charAt(0) == 'a' && folio.charAt(1) == 'd')))
    {
        
        document.frmMaster.action="FrmDatosTicket.jsp"
        document.frmMaster.submit()
    }else if(folio.length == 9 && ((folio.charAt(0) == 'A' && folio.charAt(1) == 'D') || (folio.charAt(0) == 'a' && folio.charAt(1) == 'd')))
    {
        
        document.frmMaster.action="FrmDatosTicket.jsp"
        document.frmMaster.submit()
    }else if(folio.length == 4 && folio.charAt(0) == 1){

        conFolio = 0
        document.frmMaster.action="franq.jsp"
        document.frmMaster.submit();
    }else if (folio.length == 16){
        
        if(folio.charAt(0) == 1){
            
            conFolio = 0
            document.frmMaster.action="franq.jsp"
            document.frmMaster.submit();
        }
        if(isNaN(folio)){
            
            document.getElementById("txtFolio").value="";
            alert("El folio ingresado no es correcto, favor de verificarlo");
        }else{
            
            document.getElementById("txtFolio").disabled = true;
            document.getElementById("btnTxtFolio").innerHTML = "<img width='15' src='Imagenes/loading.gif'/>";
            //preloadTicketAmount();
            //if(lsTicketAmount.length >= 1000){
                //document.frmMaster.txtFolio.value=""
                //alert("El folio ingresado no es correcto, favor de verificarlo");
            //}
            //else{
                if(validateVerifier(folio)){
                    
                    if(piCheck==1){
                        
                        document.getElementById("generacion").style.display = 'inline'
                        document.getElementById("consultar").style.display = 'inline'
                        document.getElementById("cancelacion").style.display = 'inline'
                        document.getElementById("labOpt").style.display = 'inline' 
                    }
                    else{
                        
                        var lsBrand='';
                        var lsStoreToVerify = folio.substring(0,4);

                        
                        if (!validFolioVigencyCloseYear(folio)){
                            alert('No se puede facturar un ticket de un a\u00F1o anterior.');
                            return(false); 
                        } else if (!validFolioVigency(folio)){
                            alert('No se puede facturar un ticket con m\u00E1s de 90 d\u00EDas de vigencia.');
                            return(false); 
                        } else {
                            getBrandFolio(lsStoreToVerify);
                        }
                        
                    }

                    //document.getElementById("generacion").style.display = 'inline'
                    //document.getElementById("consultar").style.display = 'inline'
                    //document.getElementById("cancelacion").style.display = 'inline'
                    //document.getElementById("labOpt").style.display = 'inline'


                } else {
                    document.frmMaster.txtFolio.value="";
                }
            //}
            document.getElementById("txtFolio").disabled = false;
            document.getElementById("btnTxtFolio").innerHTML = "?";
        }
    }
    else if(folio.length < 16){
        document.getElementById("generacion").style.display = 'none'
        document.getElementById("consultar").style.display = 'none'
        document.getElementById("cancelacion").style.display = 'none'
        document.getElementById("labOpt").style.display = 'none'
        alert("El folio ingresado no es correcto, favor de verificarlo");
    }
};
function validateBrand(psBrand){
    //console.log("La marca es "+psBrand);

    if(psBrand=='KFC'||psBrand=='FKFC'){
        document.getElementById("generacion").style.display = 'inline';
        document.getElementById("consultar").style.display = 'inline';
        document.getElementById("cancelacion").style.display = 'inline';
        document.getElementById("labOpt").style.display = 'inline';     
    }
    else{
        window.location='isPH.html';
    }
}
function validateVerifier(psParam){
      if (psParam.length==13){
        var loArray=new Array(12);
        loArray[0]=2;
        loArray[1]=3;
        loArray[2]=4;
        loArray[3]=5;
        loArray[4]=6;
        loArray[5]=7;
        loArray[6]=2;
        loArray[7]=3;
        loArray[8]=4;
        loArray[9]=5;
        loArray[10]=6;
        loArray[11]=7;

        var liTotal=0;
        var liCount=0;
        for (i=psParam.length-2;i>=0;i--){
            liTotal=liTotal+psParam.charAt(i)*loArray[liCount];
            //alert(psParam.charAt(i)*loArray[liCount]);
            //alert(liTotal);
            liCount=liCount+1;
        }
        var liVerif=liTotal%11;

        if (liVerif==11)
            liVerif=0;
        else if (liVerif==10)
            liVerif=9;
        
        if (liVerif==psParam.charAt(12))
            return(true);
        else{
            alert('Folio inválido, favor de verificarlo');
            return(false);
        }
    }else if (psParam.length==16){
        var loArray=new Array(7);
        loArray[0]=9;
        loArray[1]=8;
        loArray[2]=7;
        loArray[3]=6;
        loArray[4]=5;
        loArray[5]=4;
        loArray[6]=3;
			
        var liTotal=0;
        var liCount=0;
        var lsString1=psParam.substring(0,7);
        var lsString2=psParam.substring(7,14);						
        for (i=0;i<=6;i++){
            //alert((lsString1.charAt(i)+'+'+lsString2.charAt(i))+'*'+loArray[liCount]);				
            //alert((parseInt(lsString1.charAt(i))+parseInt(lsString2.charAt(i)))*parseInt(loArray[liCount]));			
            liTotal=liTotal+(parseInt(lsString1.charAt(i))+parseInt(lsString2.charAt(i)))*parseInt(loArray[liCount]);
            //alert(psParam.charAt(i)*loArray[liCount]);
            //alert(liTotal);
            liCount=liCount+1;
        }
        liVerif=liTotal%100;	
        //if (parseInt(liVerif.toString())==parseInt(psParam.charAt(14)+psParam.charAt(15)))                        
        if (parseInt(liVerif.toString())==parseInt(psParam.charAt(14)+psParam.charAt(15),10))
            return(true);
        else{
            alert('Folio inválido, favor de verificarlo');
            return(false);		
        }
    }
    return true;
}
function hideBtns(){
       document.getElementById("generacion").style.display = 'none'
        document.getElementById("consultar").style.display = 'none'
        document.getElementById("cancelacion").style.display = 'none'
        document.getElementById("labOpt").style.display = 'none'
}
function enviar(pag){
    folio=document.frmMaster.txtFolio.value
    if(pag == 'id4'){
        document.frmMaster.action="FrmDatosTicket.jsp"
        document.frmMaster.submit()
    }
    else
        switch(folio.substring(0,1)){
            case '0':
                switch(pag){
                    case 'id1':
                        if(folio.length >= 13  && folio.length <= 16){
                            document.frmMaster.action="gen.jsp"
                            document.frmMaster.submit();
                        }
                        else{
                            alert("Favor de ingresar un folio")
                        }
                        break;
                    case 'id2':
                        document.frmMaster.action="consultar.jsp"
                        document.frmMaster.submit()
                        break;
                    case 'id3':
                        document.frmMaster.action="can.jsp"
                        document.frmMaster.submit()
                        break;
                    default:
                        break;
                }
                break;
            case '1':
                document.frmMaster.action="franq.jsp"
                document.frmMaster.submit()
                break;
            case '2':
             switch(pag){
                    case 'id1':
                        if(folio.length >= 13  && folio.length <= 16){
                            document.frmMaster.action="gen.jsp"
                            document.frmMaster.submit()
                        }
                        else{
                            alert("Favor de ingresar un folio")
                        }
                        break;
                    case 'id2':
                        document.frmMaster.action="consultar.jsp"
                        document.frmMaster.submit()
                        break;
                    case 'id3':
                        document.frmMaster.action="can.jsp"
                        document.frmMaster.submit()
                        break;
                    default:
                        break;
                }
                break;
            default:
                alert("Ticket Invalido")
                document.frmMaster.txtFolio.value=""
                break;
        }
};
var e = 'false'
function rfcext(){
    switch(e)
    {
        case 'false':
            document.frmMaster.txtRFC.value="XEXX010101000"
            e = 'true'
            break
        case 'true':
            e = 'false'
            document.frmMaster.txtRFC.value=""
            break
    }
};
       
function prevshowRfc(){
    var psFolio=document.getElementById('txtFolio').value;
       
    if(!validStoreTax11(psFolio)){
        document.frmMaster.btnSend.disabled=false; 
        return(false);
    }else{
        showRfc();
          
    }
          
            
}
        
window.history.forward(1);
var msAgent=navigator.userAgent.toLowerCase();            
var mbIsNNLinux = ((msAgent.toLowerCase().indexOf("netscape") != -1) && (msAgent.toLowerCase().indexOf("linux") != -1));
var mbIsNN = (window.innerHeight)?true:false;
var mbIsIE = !mbIsNN;            
var gsRfcStatus='0';
var gsStatus='';
var gsTicket='';
            
function clickIE4(){
    if (event.button==2){
        return false;
    }
}

function getTicketAmountFF(){
    //var loTextFF =''; 
    var lsFolio=document.frmMaster.txtFolio.value; 
    if (window.XMLHttpRequest) {                  
        xmlhttp = new XMLHttpRequest();
    } else {                                           
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }                           

    xmlhttp.onreadystatechange = function() {                       
        if (xmlhttp.readyState == 4) {                                                                                            
            lsTicketAmount = trim(xmlhttp.responseText); 
        //lsTicketAmount=loTextFF;
        //alert('loText'+lsTicketAmount);
        //return(lsTicketAmount);
            hideLoadingGen();
        }  
        
    }
    xmlhttp.open("GET", "TicketAmount.jsp?psFolio=" + lsFolio, true);                     
    xmlhttp.send(null);                   
}

function getTicketAmount(){
    var loText =''; 
    var lsFolio=document.frmMaster.txtFolio.value; 
    //alert('getTicketAmount');
                 
    if (window.XMLHttpRequest) {                  
        xmlhttp = new XMLHttpRequest();
    } else {                                           
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }                           
 
    xmlhttp.onreadystatechange = function() {                       
        if (xmlhttp.readyState == 4) {                                                                                            
            loText = trim(xmlhttp.responseText); 
            lsTicketAmount=loText;
            hideLoadingGen();
            return(loText);
            
        }  
        
    }
    xmlhttp.open("GET", "TicketAmount.jsp?psFolio=" + lsFolio, false); 
    xmlhttp.send(null); 
}

function preloadTicketAmount(){
    //alert('preloadTicketAmount');

    showLoadingGen();
    var lsFolio=document.frmMaster.txtFolio.value;
    if ((lsFolio.length!=13 && lsFolio.length!=16 ) && lsFolio.length>1){
        alert('El ticket debe contar con 13 o 16 caracteres, favor de verificarlo.');
        document.frmMaster.txtFolio.value='';
        hideLoadingGen();
    }else{               
        if (isFireFox20()){
            getTicketAmountFF();
        }else 
            getTicketAmount();
    }
}
            
function clickNS4(e){
    if (document.layers||document.getElementById&&!document.all){
        if (e.which==2||e.which==3){
            return false;
        }
    }
}

if (document.layers){
    document.captureEvents(Event.MOUSEDOWN);
    document.onmousedown=clickNS4;
}
else if (document.all&&!document.getElementById){
    document.onmousedown=clickIE4;
}

document.oncontextmenu=new Function("return false");

        
function validTime(){
    var loDate=new Date();
    if (loDate.getHours()==2)
        window.location='./Entry/Maintenance.jsp';                
}
              
function setMaintenancePage(){
    window.location='./Entry/Maintenance2.jsp';                
}
            
function findPosX(obj) {
    var curleft = 0;

    if(obj.offsetParent) {
        while(1) {
            curleft += obj.offsetLeft;
            if(!obj.offsetParent)
                break;
            obj = obj.offsetParent;
        }
    } else if(obj.x) {
        curleft += obj.x;
    }

    obj.style.position = "static";

    return curleft;
}

function findPosY(obj) {
    var curtop = 0;

    if(obj.offsetParent) {
        while(1) {
            curtop += obj.offsetTop;
            if(!obj.offsetParent)
                break;
            obj = obj.offsetParent;
        }
    } else if(obj.y) {
        curtop += obj.y;
    }

    return curtop;
}

              
function rfcStatus(){
    if (document.frmMaster.hidRfcChange.value!='3'){
        if (gsRfcStatus=='0')
            document.frmMaster.hidRfcChange.value='1';
        else if (gsRfcStatus=='2')
            document.frmMaster.hidRfcChange.value='2';
    }
}

function showFrontLayer() {
    getCustomerData();
    document.getElementById('bg_mask').style.visibility='visible';
    document.getElementById('frontlayer').style.visibility='visible';
    return('');
}

function setSelection(psElement,psValue){                      
    var loSelectedObject=document.getElementById(psElement);
    for(i=0;i<=loSelectedObject.length-1;i++){
        if (loSelectedObject.options[i].value==psValue){                
            loSelectedObject.selectedIndex=i;
            break;
        }
    }
}

function hideFrontLayer() {
    document.getElementById('bg_mask').style.visibility='hidden';
    document.getElementById('frontlayer').style.visibility='hidden';
}

function checkEmail(){         
    document.getElementById('txtchkEmail').value=document.getElementById('txtEmail').value;
    document.getElementById('rfc_div').style.visible='none';
    document.getElementById('email_div').style.display='block';
    document.getElementById('rfc_div').style.visible='none';
    blockComment();               
}

function generateCFD(){                                
    document.getElementById("txtEmail").value=document.getElementById("txtchkEmail").value;                
    if (ValidRfcForm()){
        if (confirm('Esta seguro que los datos son correctos?  Una vez generada la factura, ya no hay posibilidad de corregirla; se debe cancelar y generar una nueva.')){
            document.frmMaster.btnGenerate.disabled=true;
            document.frmMaster.txtEntity.disabled=false;
            document.frmMaster.txtEntity.readonly=false;
            document.frmMaster.submit();
        }
    }
}
function validFolioVigency(psTicket){
        var lsYear=parseInt(psTicket.substring(9,11))+2000;
        var lsDay=psTicket.substring(11,14);        
        var lsDate=dateFromDay(lsYear,lsDay);
        var lstTodayDate=new Date(); 
        
        var liDaysDiff=parseInt((lstTodayDate.getTime()- lsDate.getTime())/(1000*60*60*24));
        
        /*if (parseInt(lsDay)<297){ // apartir del 23 de octubre
                return(false);
        }*/
        if (liDaysDiff>90){            
            //alert('El ticket time un máximo de 30 días de vigencia para poderse facturar. El ticket ingresado tiene '+liDaysDiff+' días, por lo que ya se encuentra vencido.');
            return(false);
        } else {
            return(true);
        }
    };
    function validFolioVigencyCloseYear(psTicket){
        var lsYear=parseInt(psTicket.substring(9,11))+2000;
        
        var lsDay=psTicket.substring(11,14);        
        var lsDate=dateFromDay(lsYear,lsDay);
        var lsYearFolio = lsDate.getYear();
        
        var lsTodayDate=new Date(); 
        var lsYearToday = lsTodayDate.getYear();
        var lsTodayDay = lsTodayDate.getDate();
        var lsTodayMonth = lsTodayDate.getMonth() + 1;
        
        //alert("lsTodayDate-"+lsTodayDate+"-lsTodayDay-"+lsTodayDay+"-lsTodayMonth-"+lsTodayMonth+"-lsYearFolio-"+lsYearFolio+"-lsYearToday-"+lsYearToday+"-lsDate.getMonth()-"+lsDate.getMonth()+"-lsDate.getDay()-"+lsDate.getDay());
        
        if(lsYearToday>lsYearFolio){
            if(lsTodayDay <= 31 && lsTodayMonth == 1){
                return(true);
            } else {
                return(false);
            }
        } else {
            return(true);
        }
        
        
    };
/*
            function validStore(psFolio){
                //alert('psFolio='+psFolio);
                var lsStore=psFolio.substring(1,4);
                var lsStoreFran=psFolio.substring(0,4);                
                var lsStoreList='<%=moAbcUtils.queryToString("SELECT store_id FROM ss_cat_store where (store_id<1000 or store_id in (2222,2301,2302,2303,2441))",",","")%>';                           
                if (lsStoreList.indexOf(lsStore)>=0)
                    return(true);
                else{
 
                    if (lsStoreFran.charAt(0)!='0')
                        getFranchiseeInfoAjax(lsStoreFran);
                     else 
                        alert('El ticket ingresado no corresponde a un restaurante habilitado para facturar por internet. Favor de solicitar su factura directamente en el restaurante.');
                return(false);
                }
            }
    */
function validStore(psFolio){
    var loText ='';
    if (window.XMLHttpRequest) {                  
        xmlhttp = new XMLHttpRequest();
    } else {                                           
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }                      
    xmlhttp.onreadystatechange = function() {                       
        if (xmlhttp.readyState == 4) {                                                                                            
            var loText = trim(xmlhttp.responseText);
            if (loText!=''){
                var arrText = loText.replace(/^\s+|\s+$/g, '')
                if(arrText=="TRUE")
                    return(true);
                else
                    return(false);
            }else
                alert('Error en el Store');
        }
    }    
    xmlhttp.open("GET", "chkFranq.jsp?txtFolio="+psFolio, true);
    xmlhttp.send(null);
}
            
function cancelCFD(psTicket){  
    if (validFolioVigency(psTicket)){
        if (confirm('Estas seguro que deseas cancelar la factura?')){
            showLoading();
            document.frmMaster.submit();
        }           
    }else{
        alert('No se puede cancelar/refacturar una factura con mas de 90 dias de haberse realizado la compra.');
    }
}

function resendCFD(psType){  
    var loBtn=document.getElementById('btnSend');
    document.getElementById('resend_div').style.position="absolute";                               
    document.getElementById('resend_div').style.left=findPosX(loBtn);   
    document.getElementById('resend_div').style.top=findPosY(loBtn);                 
    document.getElementById('resend_div').style.display='block';             
}
                
function abcCustomResetPage(){
    document.frmMaster.btnSend.disabled=false;
    document.frmMaster.reset();
}

function ValidRfcForm(){
    var lsPaymentMethod=document.frmMaster.cmbPaymentMethod.value;
    var lsAccountNum=document.frmMaster.txtAccountNum.value; 
                
    if (document.frmMaster.txtClient.value==''){              
        alert('Debe ingresar la Razon Social.');                    
        document.frmMaster.txtClient.focus();  
        return(false);
    }else if (document.frmMaster.txtZip.value==''){              
        document.frmMaster.txtZip.focus();  
        alert('Debe ingresar el código postal');                    
        return(false);
    }
    else if (document.frmMaster.cmbRecReg.value==''){              
        document.frmMaster.cmbRecReg.focus();  
        alert('Debe ingresar el régimen fiscal');                    
        return(false);
    }
    
    /*else if (document.frmMaster.txtStreet.value==''){  
                    alert('Debe ingresar la Calle.');                     
                    document.frmMaster.txtStreet.focus();  
                    return(false);
                }else if (document.frmMaster.txtOut.value==''){              
                    document.frmMaster.txtOut.focus();  
                    return(false);
                }else if (document.frmMaster.txtZip.value==''){              
                    document.frmMaster.txtZip.focus();  
                    return(false);
                }else if (lsPaymentMethod.indexOf('TARJETA')>=0){
        if (lsAccountNum.length<4){
            alert('Debe ingresar los ultimos 4 digitos de su tarjeta.');
            document.frmMaster.txtAccountNum.focus();                         
            return(false);
        }else if (isNaN(lsAccountNum)){
            alert('Los digitos de su tarjeta deben ser numericos.');
            document.frmMaster.txtAccountNum.focus();                           
            return(false);                        
        }
        
    }   */                            
    return(true);
}

function isFireFox20(){
    var lsAgent=navigator.userAgent;
    if (lsAgent.indexOf('Firefox')>0 && lsAgent.indexOf('2.0')>0 )
        return(true);
    else
        return(false);
}
function fillFields(paControls,paFillData) {
    var loControl = null;

    for (var i = 0; i < document.frmMaster.elements.length; i++) {
        var loControl = document.frmMaster.elements[i];

        for (var j = 0; j < paControls.length; j++) {
            if (loControl.name.toLowerCase() == paControls[j].toLowerCase()) {
                if (loControl.type=='select-one') {
                    selectComboBoxItem(loControl,paFillData[j]);
                } else if (loControl.type=='radio') {
                    if (document.getElementById(loControl.name + paFillData[j]))
                        document.getElementById(loControl.name + paFillData[j]).checked = true;
                }else if (loControl.type=='checkbox') {
                    if (paFillData[j] == '' || paFillData[j] == '0')
                        loControl.checked = false;
                    else {
                        loControl.checked = true;
                        loControl.value = paFillData[j];
                    }
                } else {
                    loControl.value = paFillData[j];
                }
            }
        }
    }
}

function dateFromDay(year, day){   
    var date = new Date(year, 0); // initialize a date in year-01-01   
    return new Date(date.setDate(day)); // add the number of days 
}
    
   
function validRfc(){
    var lsRfc=document.frmMaster.txtRFC.value
    //var lsExpressionRfcF = /^([a-zA-Z&\321]{4})([0-9]{6})([a-zA-Z0-9]{2})[0-9aA]{1}/;
    var lsExpressionRfcF = /^([a-zA-Z&\321]{4})([0-9]{2})(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1])([a-zA-Z0-9]{2})[0-9aA]{1}/;
        
    //var lsExpressionRfcM = /^([a-zA-Z&\321]{3})([0-9]{6})([a-zA-Z0-9]{2})[0-9aA]{1}/;     
    var lsExpressionRfcM = /^([a-zA-Z&\321]{3})([0-9]{2})(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1])([a-zA-Z0-9]{2})[0-9aA]{1}/;      
    var lsRfcRules='\n\nUn RFC debe constar de los siguientes elementos en este orden:\n\n';
    lsRfcRules=lsRfcRules+'A) 3 o 4 letras (persona moral y fisica respectivamente.)\n';
    lsRfcRules=lsRfcRules+'B) 2 numeros para el año (00 al 99)\n';
    lsRfcRules=lsRfcRules+'C) 2 numeros para el mes (01 al 12)\n';
    lsRfcRules=lsRfcRules+'D) 2 numeros para el dia (01 al 31)\n';
    lsRfcRules=lsRfcRules+'E) 2 alfanumericos\n';
    lsRfcRules=lsRfcRules+'F) 1 numero del 0 al 9 o la letra "A"\n';
    var lsDateRules=            'A) 2 numeros para el año (00 al 99)\n';
    lsDateRules=lsDateRules+'B) 2 numeros para el mes (01 al 12)\n';
    lsDateRules=lsDateRules+'C) 2 numeros para el dia (01 al 31)\n';


    if (lsRfc==''){
        alert('Pelotudo Debes ingresar un R.F.C. ');
        return(false);
    }else  if (lsRfc.length/1>=12 ){
        if (lsRfc.length/1==13){
            if (lsExpressionRfcF.test(lsRfc)){          
                return(true);
            } else {                      
                alert('El RFC es invalido, por favor revise que este correcto.'+lsRfcRules);  
                return(false);
            }
        }else{
            if (lsExpressionRfcM.test(lsRfc)){                    
                return(true);
            } else {                      
                alert('El RFC es invalido, por favor revise que este correcto.'+lsRfcRules);  
                return(false);
            }  
        }
    }else{
        alert('El RFC es invalido, por favor revise que este correcto.'+lsRfcRules);  
        return(false);
    }

}

        
function hideRfc(){
/*document.getElementById('Contenedor').style.display='none';
                document.getElementById('rfc_div').style.display='none';*/
}

function getAddressData(){         
    var liLen=document.frmMaster.txtZip.value.length;          
    if((liLen/1)==5){
        document.frmAddress.hidZip.value=document.frmMaster.txtZip.value;
        document.frmAddress.submit();
        gsZipFlag='1';
    }
}

function getKeyAction(psName,poEvent){
    var laFieldList=new Array('txtRFC','txtTicket','txtClient','txtCountry','txtStreet','txtOut','txtIn','txtZip','txtEmail');

    if (poEvent.keyCode==13){       
        switch (psName){

            case 'txtClient':
                if (document.getElementById(laFieldList[0]).value!='XEXX010101000')
                    document.getElementById(laFieldList[4]).focus();
                else
                    document.getElementById(laFieldList[3]).focus();
                break;
            case 'txtCountry':
                document.getElementById(laFieldList[4]).focus();
                break;
            case 'txtStreet':
                if (document.getElementById(laFieldList[0]).value!='XEXX010101000')
                    document.getElementById(laFieldList[5]).focus();
                else
                    document.getElementById(laFieldList[8]).focus();
                break;
            case 'txtOut':
                document.getElementById(laFieldList[6]).focus();
                break;
            case 'txtIn':
                document.getElementById(laFieldList[7]).focus();
                break;
            case 'txtZip':
                document.getElementById(laFieldList[8]).focus();
                getAddressData();
                break;

        }   
    }
    else if ((psName=='txtZip') && document.frmMaster.txtZip.value.length/1==5){
        getAddressData();
    }else if (psName=='txtZip' && document.frmMaster.txtZip.value.length/1==1){
        gsZipFlag='0';
        document.frmMaster.txtEntity.value='';
        document.frmMaster.txtCity.value='';
        document.frmMaster.txtDel.value='';
    }
}

function validZip(){
    var liLen=document.frmMaster.txtZip.value.length;          
    if((liLen/1)!=5){
        alert('Por favor, llene correctamente el Codigo Postal.');
        document.frmMaster.txtZip.focus();
    }
}

function setMayus(poObject){
    poObject.value=poObject.value.toUpperCase();
}


function rfcChange(){
    document.frmMaster.hidRfcChange.value='3';
}

function selectComboBoxItem(poComboBox,lsOption) {
    for(var i=0; i<=poComboBox.length-1; i++ ) {
        if (poComboBox.options[i].value==lsOption) {
            poComboBox.selectedIndex = i;
            poComboBox.options[i].selected=true;
            return;
        }
    }
}



function comiteEnable(psComite){
    var loComite = document.getElementById("cmbComite");
    if(loComite.value == "Ejecutivo Nacional"){
            document.getElementById('cmbINEEntity').disabled=true;
            document.getElementById('cmbINEEntity').selectedIndex=0;
            
            document.getElementById('txtIdConta').disabled=false;
            document.getElementById('txtIdConta').placeholder="(Opcional)";
            
            document.getElementById('cmbField').disabled=true;
            document.getElementById('cmbField').selectedIndex=0;
        } else if(loComite.value == "Ejecutivo Estatal"){
            document.getElementById('txtIdConta').disabled=true;
            document.getElementById('txtIdConta').value="";
            
            document.getElementById('cmbField').disabled=true;
            document.getElementById('cmbField').selectedIndex=0;
            
            document.getElementById('cmbINEEntity').disabled=false;
            document.getElementById('cmbINEEntity').selectedIndex=0;
        } else if(loComite.value == "Directivo Estatal"){
            
            document.getElementById('txtIdConta').disabled=false;
            document.getElementById('txtIdConta').placeholder="(Opcional)";
            
            document.getElementById('cmbField').disabled=true;
            document.getElementById('cmbField').selectedIndex=0;
            
            document.getElementById('cmbINEEntity').disabled=false;
            document.getElementById('cmbINEEntity').selectedIndex=0;
        }
        
}
function processEnable(psTypeProcess){ 
    var loProcess = document.getElementById("cmbProcess");
    var loComite = document.getElementById("cmbComite");
    if (loProcess.value == 'Ordinario'){
        document.getElementById('cmbComite').selectedIndex=0;
        document.getElementById('cmbComite').disabled=false;
        
        if(loComite.value == "Ejecutivo Nacional"){
            document.getElementById('cmbINEEntity').disabled=true;
            document.getElementById('cmbINEEntity').selectedIndex=0;
            
            document.getElementById('txtIdConta').disabled=false;
            document.getElementById('txtIdConta').value="Id Contabilidad(Opcional)";
            
            document.getElementById('cmbField').disabled=true;
            document.getElementById('cmbField').selectedIndex=0;
        } else if(loComite.value == "Ejecutivo Estatal"){
            document.getElementById('txtIdConta').disabled=true;
            document.getElementById('txtIdConta').value="";
            
            document.getElementById('cmbField').disabled=false;
            document.getElementById('cmbField').selectedIndex=0;
            
            document.getElementById('cmbINEEntity').disabled=false;
            document.getElementById('cmbINEEntity').selectedIndex=0;
        } else if(loComite.value == "Directivo Estatal"){
            
            document.getElementById('txtIdConta').disabled=false;
            document.getElementById('txtIdConta').value="Id Contabilidad(Opcional)";
            
            document.getElementById('cmbField').disabled=false;
            document.getElementById('cmbField').selectedIndex=0;
            
            document.getElementById('cmbINEEntity').disabled=true;
            document.getElementById('cmbINEEntity').selectedIndex=0;
        }
    }
    else{
        document.getElementById('cmbComite').selectedIndex=0;
        document.getElementById('cmbComite').disabled=true;
            
        document.getElementById('cmbField').disabled=false;
        document.getElementById('cmbField').selectedIndex=0;
            
        document.getElementById('cmbINEEntity').disabled=false;
        document.getElementById('cmbINEEntity').selectedIndex=0;
            
        document.getElementById('txtIdConta').disabled=true;
        document.getElementById('txtIdConta').placeholder="";
        document.getElementById('txtIdConta').value="";
    }     
}

function fixedYear(poNumber) {
    return (poNumber < 1000) ? poNumber + 1900 : poNumber;
}

function openEntity(psParam){
    if (psParam=='1'){ // Seguro
        document.getElementById('txtEntity').readonly='';
        document.frmMaster.txtEntity.readOnly=false; 
        document.frmMaster.txtEntity.disabled=false; 
        document.frmMaster.txtEntity.focus();
        document.frmMaster.txtEntity.value='';
    }else{// No seguro
        document.frmMaster.txtZip.value='';
        document.frmMaster.txtZip.focus();
    }
}

function openDialog(url, width, height, returnFunc, args) {
    if (!dialogWin.win || (dialogWin.win && dialogWin.win.closed)) {
        dialogWin.returnFunc = returnFunc
        dialogWin.returnedValue = ""
        dialogWin.args = args
        dialogWin.url = url
        dialogWin.width = width
        dialogWin.height = height
        dialogWin.name = (new Date()).getSeconds().toString()

        if (Nav4) {
            dialogWin.left = window.screenX +((window.outerWidth - dialogWin.width) / 2)
            dialogWin.top = window.screenY + ((window.outerHeight - dialogWin.height) / 2)
            var attr = "screenX=" + dialogWin.left + ",screenY=" + dialogWin.top + ",resizable=yes,width=" + dialogWin.width + ",height=" + dialogWin.height
        } else {
            dialogWin.left = (screen.width - dialogWin.width) / 2
            dialogWin.top = (screen.height - dialogWin.height) / 2
            var attr = "left=" + dialogWin.left + ",top=" + dialogWin.top + ",resizable=yes,width=" + dialogWin.width + ",height=" + dialogWin.height
        }
        dialogWin.win=window.open(dialogWin.url, dialogWin.name, attr)
        dialogWin.win.focus()
    } 
    else {
        dialogWin.win.focus()
    }
}


function setReturnedEntityData() {
    var lsValue = dialogWin.returnedValue;
    var laSrcData = (gs_current_set)?gs_current_set.split('|'):new Array(1);
    var lsControlId = '';
        
    if (laSrcData.length == 1) {
        setReturnedEntityValues(lsValue)
    }        
    if (!dialogWin.win.closed) {
        dialogWin.win.close();
        setTimeout("onCloseDialogAction();",100);
    }
}

function fillData(laControls,laData){
    document.frmMaster.txtEntity.readOnly=true; 
    document.frmMaster.txtEntity.disabled=true; 
    fillFields(laControls,laData);
//setSelection('txtEntity',laData[0]);
}

function setLabel(psType) {                
    document.frmMaster.reset();
    document.getElementById('resend_div').style.display='none';   
    document.getElementById('rfc_div').style.display='none';   
    document.getElementById("lblText").innerHTML = 'Folio del Ticket:';
    if (psType!='G'){
        document.getElementById("lblAmount").innerHTML = '';            
        document.getElementById("txtAmount").style.visibility='hidden';
        document.getElementById("lblMail").innerHTML = '';            
        document.getElementById("txtEmail").style.visibility='hidden';             
        document.getElementById("lblMulti").innerHTML = '';             
        document.getElementById("chkMulti").style.visibility='hidden';  
    /*document.getElementById("lblIEPS").innerHTML = '';  
            document.getElementById("chkIEPS").style.visibility='hidden';     */         
    }else{
        document.getElementById("lblAmount").innerHTML = 'Monto:';                        
        document.getElementById("txtAmount").style.visibility='visible'; 
        document.getElementById("lblMail").innerHTML = 'Direccion de Email:';            
        document.getElementById("txtEmail").style.visibility='visible';                
           
        document.getElementById("lblMulti").innerHTML = '¿Varios Tickets?';  
        document.getElementById("chkMulti").style.visibility='visible';  
        
    /*document.getElementById("lblIEPS").innerHTML = '&nbsp;&nbsp;Desglose IEPS';  
            document.getElementById("chkIEPS").style.visibility='visible';    */

    }
        
    var loRdo=document.getElementById('rdoType'+psType);
    loRdo.checked=true;   
    document.frmMaster.btnSend.disabled=false;   
}
    
function validAccount(psStat){
    if (psStat.indexOf("04")>=0 || psStat.indexOf("28")>=0 ){
        document.getElementById("txtAccountNum").disabled=false;
        document.getElementById("txtAccountNum").focus();
        document.frmMaster.txtAccountNum.style.backgroundColor='white';
        alert('Ingresa los ultimos 4 digitos de la tarjeta con la que se hizo el pago.');
    }else{
        document.getElementById("txtAccountNum").value='';            
        document.getElementById("txtAccountNum").disabled=true;
        document.frmMaster.txtAccountNum.style.backgroundColor='gainsboro';
    }
}


function setRFC(poObject){
    var lsForeignRFC='XEXX010101000';
        
    if(poObject.checked){
        document.getElementById('txtRFC').value=lsForeignRFC;
        document.getElementById('txtCountry').readonly=false;
        document.frmMaster.txtCountry.readOnly=false; 
    }else{
        document.getElementById('txtRFC').value='';
        document.getElementById('txtCountry').readonly=true;
        document.frmMaster.txtCountry.readOnly=true; 
    }
        
}

function centerDivWait() {
/* if(document.getElementById('rfc_div').style.display=='none'){
            document.getElementById('rfc_div').style.left = (Math.round(getWindowWidth()/2) - 135) + 'px';
            document.getElementById('rfc_div').style.top = (Math.round(getWindowHeight()/2) - 80) + 'px';
        }*/
}
   
centerDivWait();    
    
function adjustMainContainer() {
    //var liWindowHeight = getWindowHeight();
    //var liWindowWidth = getWindowWidth();
    var liMCLeftMargin = (mbIsIE)?45:(mbIsNNLinux)?60:30;
    var liMBLeftMargin = (mbIsIE)?0:(mbIsNNLinux)?5:0;
    var lbErrorFlag = false;
    centerDivWait();
}
    
function setUpper(psValue){
    document.getElementById('txtRFC').value=psValue.toUpperCase();
    if (document.getElementById('txtRFC').value=='PRB100802H20'){
        alert('No se puede facturar a nuestro propio RFC, favor de ingresar el RFC del cliente.');
        document.getElementById('txtRFC').value='';
    }    
}
    
function setNewPositionFiscal(){
//var loObj=document.getElementById('initial');
//document.getElementById('rfc_div').style.position="absolute";                               
//document.getElementById('rfc_div').style.left=findPosX(loObj)-100;   
//document.getElementById('rfc_div').style.top=findPosY(loObj)-81; 
}
    
function changeSave(poObj){
    var loChkPromo=document.getElementById('chkAdvertise');
    if(poObj.checked){
        alert('Tus datos seran guardados para usarse en futuras facturas.');
        loChkPromo.disabled=false;
    }else{
        alert('Tus datos seran borrados.');  
        loChkPromo.checked=false;
        loChkPromo.disabled=true;
    }
}


function changeSend(poObj){
    var loChkSave=document.getElementById('chkSave');
    if(!loChkSave.checked){
        alert('Para poderte enviar ');
        poObj.checked=false
    }
}
    


function blockComment(){
    document.getElementById('rfc_div').style.display='none';
}

function blockINE(){ 
    document.getElementById('ticket_INE').style.display='none';
}
    
function blockTicket(){ 
    var loMulti=document.getElementById('chkMulti');
    if (document.getElementById('txtTicket0').value==''){
        loMulti.checked=false;
        document.getElementById('hidMulti').value='0';  
    }
        
    document.getElementById('ticket_div').style.display='none';
}

function openMuiltiTicket(poObj){ 
    /*alert('Funcionalidad temporalmente deshabilitada.');
        document.getElementById('chkMulti').checked=false;
        return;
        */
    if (poObj.checked)
        document.getElementById('ticket_div').style.display='block';
    else
        closeMuiltiTicket();
        
}

function openINE(poObj){ 
    //alert('openINE');
    //if (poObj.checked)
    document.getElementById('ticket_INE').style.display='block';
/* else
            closeINE();*/
//document.getElementById('ticket_div').style.display='block';
        
}
    
function closeINE(){ 
    document.getElementById('ticket_INE').style.display='none';
}
function setMultiAmount(psAmount,psTicket,psTicketList){
    document.getElementById('txtFolio').value=psTicket;
    document.getElementById('txtAmount').value=psAmount;
    document.getElementById('hidMulti').value='1';
    document.getElementById('hidMultiTicketList').value=psTicketList;
}
function getBrandFolio(brandFolio){

    if (window.XMLHttpRequest) {                  
        xmlhttp = new XMLHttpRequest();
    } else {                                           
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }                           

    xmlhttp.onreadystatechange = function() {                       
        if (xmlhttp.readyState == 4) {                                                                                            
            lsBrandId = trim(xmlhttp.responseText); 
            
            lsBrandId=lsBrandId.replace(/^\s+|\s+$/g, '');
            //lsBrandId = lsBrandId.trim();
            //console.log(lsBrandId);
            validateBrand(lsBrandId);
            //alert('La marca es--'+lsBrandId);
            
            
            
            hideLoadingGen();
        }  

    }
    xmlhttp.open("GET", "validation.jsp?brandFolio=" + brandFolio, true);                     
    xmlhttp.send(null);
    //xmlhttp.
    
}
