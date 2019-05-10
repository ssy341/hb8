var idx = lunr(function () {
  this.field('title')
  this.field('excerpt')
  this.field('categories')
  this.field('tags')
  this.ref('id')

  this.pipeline.remove(lunr.trimmer)

  for (var item in store) {
    this.add({
      title: store[item].title,
      excerpt: store[item].excerpt,
      categories: store[item].categories,
      tags: store[item].tags,
      id: item
    })
  }
});

console.log( jQuery.type(idx) );

$(document).ready(function() {
  $('input#searchipt').on('keyup', function () {
    var resultdiv = $('#results');
    var query = $(this).val().toLowerCase();
    var result =
      idx.query(function (q) {
        query.split(lunr.tokenizer.separator).forEach(function (term) {
          q.term(term, { boost: 100 })
          if(query.lastIndexOf(" ") != query.length-1){
            q.term(term, {  usePipeline: false, wildcard: lunr.Query.wildcard.TRAILING, boost: 10 })
          }
          if (term != ""){
            q.term(term, {  usePipeline: false, editDistance: 1, boost: 1 })
          }
        })
      });
    resultdiv.empty();
    // resultdiv.prepend('<p class="results__found">'+result.length+ 'Result(s) found</p>');
    for (var item in result) {
       var searchitem = '<li class="poibox">' +
            '<div class="amap_lib_placeSearch_poi poibox-icon">1</div>' +
            '<div class="poi-img"' +
                'style="background-image:url(http://n1-q.mafengwo.net/s6/M00/10/89/wKgB4lNSTheAG8uXAANwK987G-Q34.jpeg?imageMogr2%2Fthumbnail%2F%21690x370r%2Fgravity%2FCenter%2Fcrop%2F%21690x370%2Fquality%2F100)"></div>' +
                '<h3 class="poi-title"><span class="poi-name">春熙路</span><a class="poi-more" title="详情">&gt;</a></h3>' +
                '<div class="poi-info">' +
                '<p class="poi-addr">中国四川省成都市锦江区盐市口商圈</p>' +
            '</div>' +
            '<div class="clear"></div>' +
        '</li>';
      resultdiv.append(searchitem);
    }
  });
});
