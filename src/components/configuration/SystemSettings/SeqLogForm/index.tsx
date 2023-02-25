import { px } from '@/utils';
import React from 'react';
import styled from 'styled-components';
import {
  Checkbox,
  TextInput,
  FormGroup,
  Select,
  SelectItem,
  NumberInput,
  RadioButtonGroup,
  RadioButton,
} from '@carbon/react';
import { Formik, Form, Field } from 'formik';
import { AlertProfileSchema } from '@/schemas/schema';
import ErrorMessage from '@/components/shared/ErrorMessage/ErrorMessage';
import { FormContainer } from '@/components/onboard/NewUserLoginForm';
import { initialAlertProfileValue } from '@/schemas/schema';
import Button from '@/components/shared/Button';

interface Iprops {
  isEdit?: boolean;
}

const SeqLogForm = ({ isEdit }: Iprops) => {
  return (
    <Container>
      <MailNav>
        <ActionContainer>
          <Button
            renderIcon={null}
            handleClick={() => console.log('123')}
            buttonLabel="Save changes"
            disabled={true}
          />
        </ActionContainer>
      </MailNav>{' '}
      <ModalItem>
        <Formik
          initialValues={initialAlertProfileValue}
          validationSchema={AlertProfileSchema}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(false);
          }}
        >
          {({ errors, touched, setFieldTouched }) => (
            <Form>
              <FormGroup legendText="">
                <FormField>
                  <FormContainer>
                    <Field name="name">
                      {({ field }: any) => (
                        <TextInput
                          {...field}
                          type="text"
                          id="name-input"
                          labelText="Profile Name"
                          placeholder="enter name"
                          onKeyUp={() => setFieldTouched('name', true)}
                        />
                      )}
                    </Field>
                    <Field name="template">
                      {({ field }: any) => (
                        <Select
                          id="select-1"
                          labelText="Template"
                          {...field}
                          onKeyUp={() => setFieldTouched('template', true)}
                        >
                          <SelectItem text="Choose option" />
                          <SelectItem text="Option 1" value="option-1" />
                          <SelectItem text="Option 2" value="option-2" />
                        </Select>
                      )}
                    </Field>
                    <ErrorMessage
                      invalid={Boolean(touched.name && errors.name)}
                      invalidText={errors.name}
                    />
                    <ErrorMessage
                      invalid={Boolean(touched.template && errors.template)}
                      invalidText={errors.template}
                    />
                  </FormContainer>
                </FormField>
                <FormField>
                  <FormContainer>
                    <Field name="min_threshold">
                      {({ field }: any) => (
                        <NumberInput
                          {...field}
                          id="min_threshold-input"
                          label="Email minimum threshold"
                          max={10000}
                          min={0}
                          step={10}
                          className="number-input"
                          value={0}
                          placeholder="0"
                          onKeyUp={() => setFieldTouched('min_threshold', true)}
                        />
                      )}
                    </Field>
                    <Field name="max_threshold">
                      {({ field }: any) => (
                        <NumberInput
                          {...field}
                          id="max_threshold-input"
                          label="Email maximum threshold"
                          max={10000}
                          min={0}
                          step={10}
                          className="number-input"
                          value={0}
                          placeholder="0"
                          onKeyUp={() => setFieldTouched('max_threshold', true)}
                        />
                      )}
                    </Field>
                    <ErrorMessage
                      invalid={Boolean(
                        touched.min_threshold && errors.min_threshold
                      )}
                      invalidText={errors.min_threshold}
                    />
                    <ErrorMessage
                      invalid={Boolean(
                        touched.max_threshold && errors.max_threshold
                      )}
                      invalidText={errors.max_threshold}
                    />
                    <ModalItem>
                      <ModalLabel>Radio Button</ModalLabel>{' '}
                      <RadioButtonGroup>
                        <RadioButton
                          labelText="Radio button label"
                          value="radio-3"
                          id="radio-3"
                          disabled
                        />
                      </RadioButtonGroup>
                    </ModalItem>
                    <ModalItem>
                      <ModalLabel>Hide Balance?</ModalLabel>{' '}
                      <Checkbox id="checked" labelText="Yes" />
                    </ModalItem>
                  </FormContainer>
                </FormField>
              </FormGroup>
            </Form>
          )}
        </Formik>
      </ModalItem>
    </Container>
  );
};

export default SeqLogForm;

const Container = styled.div`
  width: 100%;
  height: calc(100vh - 300px);
  overflow: auto;

  .color-picker {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, 10%);
    z-index: 1000;
    background-color: ${({ theme }) => theme.colors.bgHover};
    border: 1px solid ${({ theme }) => theme.colors.borderLight};
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  }

  form {
    padding: 0 ${px(252)} ${px(16)} ${px(13)};
    svg {
      fill: ${({ theme }) => theme.colors.white} !important ;
    }
  }
`;

const MailNav = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${px(24)};
  justify-content: flex-end;
`;

const ActionContainer = styled.div`
  button {
    padding: ${px(10)} ${px(16)};
  }
`;

const ModalContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${px(17)};
  justify-content: center;
`;

const ModalItem = styled.div``;

const ModalLabel = styled.div`
  color: ${({ theme }) => theme.colors.lightText} !important;
  font-size: ${({ theme }) => theme.fontSizes.s};
  font-weight: 400;
  line-height: ${px(12)};
  margin-bottom: ${px(9)};
  margin-top: ${px(16)};
`;

const FormField = styled.div`
  margin-bottom: ${px(16)};
`;

const FormEmailContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${px(16)};
`;

// import React from 'react';
// import {
//   TextInput,
//   TextArea,
//   Dropdown,
//   Checkbox,
//   RadioButtonGroup,
//   RadioButton,
// } from '@carbon/react';
// import styled from 'styled-components';
// import { px } from '@/utils';
// import Button from '@/components/shared/Button';
// import { Formik, Form, Field } from 'formik';
// import { SeqLogSchema } from '@/schemas';
// import { initialSeqLog } from '@/interfaces/dtos';
// import { RadioButtonGroup, RadioButton } from '@carbon/react';

// const items: string[] = ['Baya', 'Pcsis', 'Nottie'];

// const checkboxFields = [{ label: 'Transaction service', id: 'checkbox_1' }];

// const SeqLogForm = () => {
//   return (
//     <Container>
//       <MailNav>
//         <ActionContainer>
//           <Button
//             renderIcon={null}
//             handleClick={() => console.log('123')}
//             buttonLabel="Save changes"
//           />
//         </ActionContainer>
//       </MailNav>{' '}
//       <InputContainer>
//         <InputCover>
//           <TextInput
//             id="text-input-1"
//             type="text"
//             labelText="Text input label"
//           />
//         </InputCover>
//         <InputCover>
//           <Dropdown
//             id="default"
//             titleText="Dropdown label"
//             label="Dropdown menu options"
//             items={items}
//             itemToString={(item: string) => (item ? item : '')}
//           />
//         </InputCover>
//         <InputCover>
//           {checkboxFields.map((checkbox) => (
//             <Checkbox
//               key={checkbox.id}
//               labelText={checkbox.label}
//               id={checkbox.id}
//               checked
//             />
//           ))}
//         </InputCover>
//         <InputCover>
//           <TextArea
//             labelText="Text Area label"
//             rows={4}
//             id="text-area-1"
//           />
//         </InputCover>
//         <InputCover>
//           <RadioButtonGroup>
//             <RadioButton
//               labelText="Radio button label"
//               value="radio-3"
//               id="radio-3"
//               disabled
//             />
//           </RadioButtonGroup>
//         </InputCover>
//       </InputContainer>
//     </Container>
//   );
// };

// export default SeqLogForm;

// const Container = styled.div`
//   width: 100%;
//   height: calc(100vh - 300px);
//   overflow: auto;

//   .color-picker {
//     position: absolute;
//     left: 50%;
//     top: 50%;
//     transform: translate(-50%, 10%);
//     z-index: 1000;
//     background-color: ${({ theme }) => theme.colors.bgHover};
//     border: 1px solid ${({ theme }) => theme.colors.borderLight};
//     box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
//   }

//   form {
//     padding: 0 ${px(252)} ${px(16)} ${px(13)};
//     svg {
//       fill: ${({ theme }) => theme.colors.white} !important ;
//     }
//   }
// `;

// const MailNav = styled.div`
//   display: flex;
//   align-items: center;
//   margin-bottom: ${px(24)};
//   justify-content: flex-end;
// `;

// const ActionContainer = styled.div`
//   button {
//     padding: ${px(10)} ${px(16)};
//   }
// `;

// const InputContainer = styled.div`
//   width: 100%;
//   margin: 2rem;

//   display: flex;
//   flex-direction: column;
// `;
// const InputCover = styled.div`
//   max-width: 50%;
//   margin-bottom: 1rem;
// `;
