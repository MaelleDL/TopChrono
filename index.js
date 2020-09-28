// $(document).ready(function(){
    countdownManager = {
    // Configuration
    targetTime: new Date('March 23 00:00:00 2021'), // Date cible du compte à rebours (00:00:00)
    displayElement: { // Elements HTML où sont affichés les informations
        month:  null,
        week: null,
        day:  null,
        hour:  null
    },
     
    // Initialisation du compte à rebours (à appeler 1 fois au chargement de la page)
    init: function(){
        // Récupération des références vers les éléments pour l'affichage
        // La référence n'est récupérée qu'une seule fois à l'initialisation pour optimiser les performances
        this.displayElement.month  = jQuery('#countdown_month');
        this.displayElement.week = jQuery('#countdown_week');
        this.displayElement.day  = jQuery('#countdown_day');
        this.displayElement.hour = jQuery('#countdown_hour');
         
        // Lancement du compte à rebours
        this.tick(); // Premier tick tout de suite
        window.setInterval("countdownManager.tick();", 3600000); // Ticks suivant, répété toutes les secondes (1000 ms)
    },
     
    // Met à jour le compte à rebours (tic d'horloge)
    tick: function(){
        // Instant présent
        var timeNow  = new Date();
         
        // On s'assure que le temps restant ne soit jamais négatif (ce qui est le cas dans le futur de targetTime)
        if( timeNow > this.targetTime ){
            timeNow = this.targetTime;
        }
         
        // Calcul du temps restant
        var diff = this.dateDiff(timeNow, this.targetTime);
         
        this.displayElement.month.text(  updateTime(diff.month)  );
        this.displayElement.week.text( updateTime(diff.week) );
        this.displayElement.day.text(  updateTime(diff.day) );
        this.displayElement.hour.text(  updateTime(diff.hour) );
    },
     
    // Calcul la différence entre 2 dates,
    dateDiff: function(date1, date2){
        var diff = {}                           // Initialisation du retour
        var tmp = date2 - date1;
 
        tmp = Math.floor(tmp/3600000);           
        diff.hour = tmp % 24;                    //Nombre d'heures
        tmp = Math.floor((tmp-diff.hour)/24);    
        diff.day1 = tmp % 30;                    //Nombre de jours en tout
        tmp = Math.floor((tmp-diff.day1)/30);  
        diff.month = tmp;                        //Nombre de mois
        diff.day = diff.day1 % 7;                // Nombre de jours réels
        diff.week=(diff.day1-diff.day)/7;        //Nombre de semaines
        return diff;
    }
};

function updateTime(k) {       //Pour être toujours en format 2chiffres
  if (k < 10) {
    return "0" + k;
  }
  else {
    return k;
  }
}
 
jQuery(function($){
    // Lancement du compte à rebours au chargement de la page
    countdownManager.init();
});
    // });