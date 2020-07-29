// Variables
var counterFirstTime = true;

// Check screen size (at the begining)
if ($(window).width() <= 791) {
  $(".navbar").attr("dir", "rtl");
  $(".am-i").remove();
  $(".who").text("من أنا؟");
} else {
  $(".navbar").attr("dir", "ltr");
}

// Screen resizing
$(window).resize(function() {
  if ($(window).width() <= 791) {
    $(".navbar").attr("dir", "rtl");
    $(".am-i").remove();
    $(".who").text("من أنا؟");
  } else {
    $(".navbar").attr("dir", "ltr");
    $(".who").text("من");
    if (!$(".am-i").length) {
      $(".who").after('<h1 class="about-title-text am-i">أنا؟</h1>');
    }
  }
});

// Counting animation
$(document).on('scroll', function() {
  if ($(this).scrollTop() >= $('.counter').position().top) {
    if (counterFirstTime) {
      counterFirstTime = false;
      $('.counter-count').each(function() {
        $(this).prop('Counter', 0).animate({
          Counter: $(this).text()
        }, {
          duration: 5000,
          easing: 'swing',
          step: function(now) {
            $(this).text(Math.ceil(now));
          }
        });
      });
    }
  }
});

// Project description slide animation
$(".project-container").hover(function() {
   $(".project-description", this).slideDown("slow");
   $(".project-background", this).css("opacity", "0");
}, function() {
   $(".project-description", this).slideUp("slow");
   $(".project-background", this).css("opacity", "0.5");
});

//Contact form button
$(".contact-button-icon").click(function () {
  $(".contact-button-icon").attr("class", "fa fa-paper-plane fa-2x contact-button-icon");
  $(".form-control").reset();
});

// Job title animation
var TxtRotate = function(el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = '';
  this.tick();
  this.isDeleting = false;
};

TxtRotate.prototype.tick = function() {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

  var that = this;
  var delta = 300 - Math.random() * 100;

  if (this.isDeleting) {
    delta /= 2;
  }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }

  setTimeout(function() {
    that.tick();
  }, delta);
};

window.onload = function() {
  var elements = document.getElementsByClassName('txt-rotate');
  for (var i = 0; i < elements.length; i++) {
    var toRotate = elements[i].getAttribute('data-rotate');
    var period = elements[i].getAttribute('data-period');
    if (toRotate) {
      new TxtRotate(elements[i], JSON.parse(toRotate), period);
    }
  }
  var css = document.createElement("style");
  css.type = "text/css";
  css.innerHTML = ".txt-rotate > .wrap { border-left: 0.08em solid #999999 }";
  document.body.appendChild(css);
};
