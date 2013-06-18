
require(['jquery', 'cfg/'+_g.env, 'canjs'], function($, conf, can){

  console.log(
    can.view.render(
      require.toUrl('ejs/recipe.ejs'), 
      {recipes:['a','b']}
    )
  );

  console.log('mod1');
});



