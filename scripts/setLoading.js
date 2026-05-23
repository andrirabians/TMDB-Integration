const setLoading = (isTrue) => {
  const submitBtn = document.getElementById("submitSearch");
  if (isTrue) {
    submitBtn.disabled = true;
  } else {
    (submitBtn.disabled = false);
  }
};

export default setLoading;
