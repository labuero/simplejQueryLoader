var jQueryLoader = function(callback,jQuerySrc){

jQuerySource = jQuerySrc || "https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js";


/////////////////////// JQUERY CHECK ////////////////////

  // prüfen ob jquery vorhanden, wenn nö, dann nachladen
	if (typeof $ === 'undefined') {

         // vor dem nachladen prüfen ob eventuell schon eine jquery Datei angefordert wurde
         // alle Script Elemente holen
         var jsLinks = document.getElementsByTagName('script');

         //testvariable
         var jqueryLink = false; 

         //alle script elemente durchlaufen...
         for(var i = 0; i < jsLinks.length; i++){   
              //... und prüfen ob der src bereits unseren pfad auf die jquery datei enthält
              var src = jsLinks[i].src;
              var testlink = new RegExp("jquery.min.js","ig");
              var checkResult = src.match(testlink);         
                
              if(checkResult !== null){ 
                jqueryLink = true; 
              }   

          }   
     
          // jQuery scheint noch nicht vorhanden oder angefordert
          if(jqueryLink === false){
          		  //einfügen des script tag in den header
              	var script = document.createElement('script');
              	script.src = jQuerySource;
              	document.getElementsByTagName('head')[0].appendChild(script);         
    	    }


          var checkCounter = 0

          //warten bis jquery vollständig geladen wurde, erst dann geht es weiter
          function checkjQueryLoaded() {
              
                if (typeof $ !== 'undefined') {              
                     //jquery ist nicht länger undefined ... und los
                     callback();        
                }else{               
                     
                      if(checkCounter > 40){ throw ('waiting too long to jQuery loading'); return false;}
                      
                      //100ms warten und dann nochmal prüfen
                      ebyDynjQueryInt = window.setTimeout(checkjQueryLoaded, 100);
                      checkCounter ++;
                      
                }               

          }
          // prüfung starten
          checkjQueryLoaded();
  
	}else{

		//jQuery ist bereits geladen ... dann los
		callback();

	}
/////////////////////// JQUERY CHECK ENDE ////////////////////
		
}