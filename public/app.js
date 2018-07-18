$(function() {
  function literalTemplate(meowem) {
    return `
    <article class="meowem">
      <h3>${meowem.name}</h3>
      <p>${meowem.content}</p>
    </article>
    `
  }

  function appendTemplate(meowem) {
    var article = $('<article>').addClass('meowem')

    $('<h3>').text(meowem.name).appendTo(article)
    $('<p>').text(meowem.content).appendTo(article)

    return article
  }

  function objectTemplate(meowem) {
    return $('<article>', {
      'class': 'meowem',
      html: [
        $('<h3>', {
          text: meowem.name 
        }),
        $('<p>', {
          text: meowem.content
        })
      ] 
    })
  }

  function loadData() {
    
    $.ajax({
      method: "GET",
      url: "/meowems",
    })
    .done(function(meowems) {
      render(meowems)
    })
  }

  function render(meowems) {
    meowems.forEach(function(meowem) {
      $('section.meowems').prepend(literalTemplate(meowem))
    })
  }

  $('form').on('submit', function(event) {
    event.preventDefault()
    var content = event.target.elements.content
    
    if(content.value === '') {
      return
    }

    $.ajax({
      method: "POST",
      url: "/meowems",
      data: $(this).serialize()
    })
    .done(function(meowems) {
      render([meowems])
    })

    content.value = ''
  })

  loadData()
})