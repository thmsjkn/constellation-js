/* -*- js-indent-level:2 -*-
 *
 * Mantis.js / jQuery / Zepto.js plugin for Constellation
 * @version 2.0.0
 * @author Thomas Joeken <info@thomasjoeken.de>, Acauã Montiel <contato@acauamontiel.com.br>
 */
(function ($, window) {
  /**
   * Makes a nice constellation on canvas
   * @constructor Constellation
   */
  function Constellation (canvas, options) {
    var $canvas = $(canvas)
    var context = canvas.getContext('2d')
    var defaults = {
      star: {
        color: 'rgba(255, 255, 255, .5)',
        width: 1,
        randomWidth: true
      },
      line: {
        color: 'rgba(255, 255, 255, .5)',
        width: 0.2
      },
      poosition: {
        x: 0, // This value will be overwritten at startup
        y: 0 // This value will be overwritten at startup
      },
      width: window.innerWidth,
      height: window.innerHeight,
      velocity: 0.8,
      length: 100,
      distance: 120,
      radius: 150,
      stars: []
    }
    var config = $.extend(true, {}, defaults, options)
    if (config.density) {
      var before = config.length
      config.length = (config.width * config.height) / config.density
      config.radius = config.radius * Math.sqrt(config.length / before)
    }

    function Star () {
      this.x = Math.random() * canvas.width
      this.y = Math.random() * canvas.height

      this.vx = (config.velocity * (Math.random() - 0.5))
      this.vy = (config.velocity * (Math.random() - 0.5))

      this.radius = config.star.randomWidth ? (Math.random() * config.star.width) : config.star.width
    }

    Star.prototype = {
      create: function () {
        context.beginPath()
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        context.fill()
      },

      animate: function () {
        var i

        for (i = 0; i < config.length; i++) {
          var star = config.stars[i]

          if (star.y < 0 || star.y > canvas.height) {
            star.vx = star.vx
            star.vy = -star.vy
          } else if (star.x < 0 || star.x > canvas.width) {
            star.vx = -star.vx
            star.vy = star.vy
          }

          star.x += star.vx
          star.y += star.vy
        }
      },

      line: function () {
        var length = config.length
        var iStar
        var jStar
        var i
        var j

        for (i = 0; i < length; i++) {
          for (j = 0; j < length; j++) {
            iStar = config.stars[i]
            jStar = config.stars[j]

            if (
              (iStar.x - jStar.x) < config.distance &&
                (iStar.y - jStar.y) < config.distance &&
                (iStar.x - jStar.x) > -config.distance &&
                (iStar.y - jStar.y) > -config.distance
            ) {
              if (
                (iStar.x - config.position.x) < config.radius &&
                  (iStar.y - config.position.y) < config.radius &&
                  (iStar.x - config.position.x) > -config.radius &&
                  (iStar.y - config.position.y) > -config.radius
              ) {
                context.beginPath()
                context.moveTo(iStar.x, iStar.y)
                context.lineTo(jStar.x, jStar.y)
                context.stroke()
                context.closePath()
              }
            }
          }
        }
      }
    }

    this.createStars = function () {
      var length = config.length
      var star
      var i

      context.clearRect(0, 0, canvas.width, canvas.height)

      for (i = 0; i < length; i++) {
        config.stars.push(new Star())
        star = config.stars[i]

        star.create()
      }

      star.line()
      star.animate()
    }

    this.animateStars = function () {
      var length = config.length
      var star
      var i

      context.clearRect(0, 0, canvas.width, canvas.height)

      for (i = 0; i < length; i++) {
        star = config.stars[i]
        star.create()
      }

      star.line()
      star.animate()
    }

    this.setCanvas = function () {
      canvas.width = config.width
      canvas.height = config.height
    }

    this.setContext = function () {
      context.fillStyle = config.star.color
      context.strokeStyle = config.line.color
      context.lineWidth = config.line.width
    }

    this.setInitialPosition = function () {
      if (!options || !options.hasOwnProperty('position')) {
        config.position = {
          x: canvas.width * 0.5,
          y: canvas.height * 0.5
        }
      }
    }

    this.loop = function (callback) {
      callback()

      window.requestAnimationFrame(function () {
        window.setTimeout(() => this.loop(callback), 1000 / 25)
      }.bind(this))
    }

    this.bind = function () {
      $canvas.on('mousemove', function (e) {
        config.position.x = e.pageX - $canvas.offset().left
        config.position.y = e.pageY - $canvas.offset().top
      })
    }

    this.init = function () {
      this.setCanvas()
      this.setContext()
      this.setInitialPosition()
      this.createStars()
      this.loop(this.animateStars)
      this.bind()
    }
  }

  $.fn.constellation = function (options) {
    return this.each(function () {
      var c = new Constellation(this, options)
      c.init()
    })
  }
})($, window)

