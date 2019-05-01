<app>
  <navigation title={title}/>
  <router>
    <route path=""><landing title={title} /></route>
    <route path="register/*"><register /></route>
  </router>
  <script>
    window.title = opts.title;
  </script>  
</app>