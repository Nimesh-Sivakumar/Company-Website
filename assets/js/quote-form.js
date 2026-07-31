export function initQuoteForm(form, success) {
  if (!form || !success) return () => {};
  const onSubmit = (event) => {
    event.preventDefault();
    success.classList.add('show');
  };
  form.addEventListener('submit', onSubmit);
  return onSubmit;
}
