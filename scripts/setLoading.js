const setLoading = (isTrue) => {
    const submitBtn = document.getElementById("submitSearch")
    const isLoading = document.getElementById("isLoading")
    if(isTrue){
        isLoading.innerHTML = (``);
        submitBtn.disabled=true
    }else{
        isLoading.innerHTML = (""),
        submitBtn.disabled=false
    }
}