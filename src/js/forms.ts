import Validator from "./classes/Validator";
import axios from "axios";

export default function forms() {
  const forms = Array.from<HTMLFormElement>(
    document.querySelectorAll(".js-form")
  );

  const successModal = document.querySelector<HTMLElement>("#success");
  const errorModal = document.querySelector<HTMLElement>("#error");

  forms.forEach((form) => {
    const formValidator = new Validator(form);
    const controller = new AbortController();
    const submitBtn = form.querySelector<HTMLButtonElement>(
      'button[type="submit"]'
    );

    const handleFormSubmit = (event: SubmitEvent) => {
      event.preventDefault();
      if (!formValidator || !form) return;
      formValidator.validate();

      console.log("Validated", formValidator.valid);

      if (formValidator.valid) {
        const formData = new FormData(form);
        if (submitBtn) submitBtn.disabled = true;
        axios
          .post(form.action, formData, {
            signal: controller.signal,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((res) => {
            console.log(res.data);
            if (form) {
              form.reset();
            }
            if (res.data.status === "mail_sent" && successModal) {
              Array.from(
                document.querySelectorAll<HTMLElement>(".js-modal")
              ).forEach((modal) => modal.classList.remove("active"));
              document.body.classList.add("modal-open");
              successModal?.classList.add("active");
            } else {
              Array.from(
                document.querySelectorAll<HTMLElement>(".js-modal")
              ).forEach((modal) => modal.classList.remove("active"));
              document.body.classList.add("modal-open");
              errorModal?.classList.add("active");
            }
          })
          .catch((err) => {
            Array.from(
              document.querySelectorAll<HTMLElement>(".js-modal")
            ).forEach((modal) => modal.classList.remove("active"));
            document.body.classList.add("modal-open");
            errorModal?.classList.add("active");
            console.error(err);
          })
          .finally(() => {
            if (submitBtn) submitBtn.disabled = false;
          });
      }
    };
    form.addEventListener("submit", handleFormSubmit);
  });
}
