import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";

import { useDispatch } from "react-redux";

import "./styles.css";

import { checkoutCartRequest } from "../../store/modules/cart/actions";

export default function FormCheckoutCart() {
  const dispatch = useDispatch();

  return (
    <div className="app">
      <h1>Finalizar pedido</h1>

      <Formik
        initialValues={{
          nome: "",
          email: "",
          cpf: "",
          cep: "",
          rua: "",
          bairro: "",
          numero: "",
        }}
        onSubmit={() => dispatch(checkoutCartRequest())}
        validationSchema={Yup.object().shape({
          nome: Yup.string().required("Obrigatório"),
          email: Yup.string().email().required("Obrigatório"),
          cpf: Yup.string().required("Obrigatório"),
          cep: Yup.string().required("Obrigatório"),
          rua: Yup.string().required("Obrigatório"),
          bairro: Yup.string().required("Obrigatório"),
          numero: Yup.string().required("Obrigatório"),
        })}
      >
        {(props) => {
          const {
            values,
            touched,
            errors,
            isSubmitting,
            handleChange,
            handleBlur,
            handleSubmit,
          } = props;
          return (
            <form onSubmit={handleSubmit}>
              <label htmlFor="nome" style={{ display: "block" }}>
                Nome Completo
              </label>
              <input
                id="nome"
                placeholder="Digite seu nome"
                type="text"
                value={values.nome}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.nome && touched.nome && (
                <div className="input-feedback">{errors.nome}</div>
              )}
              <label htmlFor="email" style={{ display: "block" }}>
                Email
              </label>
              <input
                id="email"
                placeholder="Digite seu e-mail"
                type="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.email && touched.email && (
                <div className="input-feedback">{errors.email}</div>
              )}
              <label htmlFor="cpf" style={{ display: "block" }}>
                CPF
              </label>
              <input
                id="cpf"
                placeholder="Digite seu CPF"
                type="text"
                value={values.cpf}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.cpf && touched.cpf && (
                <div className="input-feedback">{errors.cpf}</div>
              )}
              <label htmlFor="cep" style={{ display: "block" }}>
                CEP
              </label>
              <input
                id="cep"
                placeholder="Digite seu CEP"
                type="text"
                value={values.cep}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.cep && touched.cep && (
                <div className="input-feedback">{errors.cep}</div>
              )}
              <label htmlFor="rua" style={{ display: "block" }}>
                Rua
              </label>
              <input
                id="rua"
                placeholder="Digite sua rua"
                type="text"
                value={values.rua}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.rua && touched.rua && (
                <div className="input-feedback">{errors.rua}</div>
              )}
              <label htmlFor="bairro" style={{ display: "block" }}>
                Bairro
              </label>
              <input
                id="bairro"
                placeholder="Digite seu bairro"
                type="text"
                value={values.bairro}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.bairro && touched.bairro && (
                <div className="input-feedback">{errors.bairro}</div>
              )}
              <label htmlFor="numero" style={{ display: "block" }}>
                Número
              </label>
              <input
                id="numero"
                placeholder="Digite seu número"
                type="text"
                value={values.numero}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.numero && touched.numero && (
                <div className="input-feedback">{errors.numero}</div>
              )}
              <button type="submit" disabled={isSubmitting}>
                FINALIZAR
              </button>
            </form>
          );
        }}
      </Formik>
    </div>
  );
}
