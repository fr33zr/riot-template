<register>
  <div class="container-fluid pt-3">
    <div class="row">
      <div class="col">
        <p>Step { stepNo }</p>
      </div>  
    </div>
  </div>   
  <script>
    this.on('route', stepNo => this.stepNo = stepNo)
  </script>  
</register>