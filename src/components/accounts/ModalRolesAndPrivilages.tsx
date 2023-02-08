import React from 'react';
import { TextInput, Checkbox } from '@carbon/react';
import { Edit } from '@carbon/react/icons';
import { Formik, Form, Field } from 'formik';
import styled from 'styled-components';
import Modal from '../shared/Modal';
import { RolesAndPrivilagesSchema } from '@/schemas';

const checkBoxFileds = [
  [
    { label: 'Can create', id: 'check-box-1' },
    { label: 'Can edit', id: 'check-box-2' },
    { label: 'Can approve', id: 'check-box-3' },
  ],
  [
    { label: 'Can create', id: 'check-box-4' },
    { label: 'Can edit', id: 'check-box-5' },
    { label: 'Can update', id: 'check-box-6' },
  ],
  [
    { label: 'Can create', id: 'check-box-7' },
    { label: 'Can edit', id: 'check-box-8' },
    { label: 'Can update', id: 'check-box-9' },
  ],
];

type IPROPS = {
  isEdit: boolean;
};

const ModalisEditsAndPrivilages = ({ isEdit }: IPROPS) => {
  return (
    <>
      <Modal
        buttonLabel={!isEdit ? 'Create role' : 'Save Changes'}
        buttonIcon={(props: any) => <Edit size={20} {...props} />}
        heading={!isEdit ? 'Create New Role' : 'Edit Role'}
        buttonTriggerText={!isEdit ? 'Create role' : ''}
        secondaryButtonText="Close"
        extent="lg"
      >
        <ModalContainer>
          <Formik
            initialValues={{ roleName: '', roleDescription: '' }}
            validationSchema={RolesAndPrivilagesSchema}
            onSubmit={(values, { setSubmitting }) => {
              setSubmitting(false);
            }}
          >
            {({ errors, touched, handleChange, values }) => (
              <Form>
                <Field name="roleName">
                  {({ field }: any) => (
                    <InputContainer>
                      <Text
                        {...field}
                        type="text"
                        id="role-name"
                        labelText="User Role"
                        placeholder="input text"
                        onChange={handleChange}
                      />
                    </InputContainer>
                  )}
                </Field>

                <Field name="roleDescription">
                  {({ field }: any) => (
                    <InputContainer>
                      <Text
                        {...field}
                        type="text"
                        id="role-description"
                        labelText="Role Description"
                        placeholder="input text"
                        onChange={handleChange}
                      />
                    </InputContainer>
                  )}
                </Field>
              </Form>
            )}
          </Formik>

          <CheckBoxContainer>
            <Label>Privilages</Label>
            <CheckBoxContent>
              <Wrapper>
                <CheckBoxHeader>Alert & Notification</CheckBoxHeader>
                <CheckBoxWrapper>
                  {checkBoxFileds[0].map((checkbox) => (
                    <Checkbox key={checkbox.id} labelText={checkbox.label} id={checkbox.id} />
                  ))}
                </CheckBoxWrapper>
              </Wrapper>
              <Wrapper>
                <CheckBoxHeader>Users</CheckBoxHeader>
                <CheckBoxWrapper>
                  {checkBoxFileds[1].map((checkbox) => (
                    <Checkbox key={checkbox.id} labelText={checkbox.label} id={checkbox.id} />
                  ))}
                </CheckBoxWrapper>
              </Wrapper>
              <Wrapper>
                <CheckBoxHeader>Roles & Privileges</CheckBoxHeader>
                <CheckBoxWrapper>
                  {checkBoxFileds[2].map((checkbox) => (
                    <Checkbox key={checkbox.id} labelText={checkbox.label} id={checkbox.id} />
                  ))}
                </CheckBoxWrapper>
              </Wrapper>
            </CheckBoxContent>
          </CheckBoxContainer>
        </ModalContainer>
      </Modal>
    </>
  );
};

export default ModalisEditsAndPrivilages;




const ModalContainer = styled.div`
  width: 100%;
  padding: 1rem;
`;

const InputContainer = styled.div`
  width: 100%;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.lightText};
`;

const Text= styled(TextInput)`
  label{
    color: ${({ theme }) => theme.colors.lightText};
  }
`

const CheckBoxContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.p`
  font-family: ${({ theme }) => theme.fontFamilies.heading};
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;

  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.lightText};
`;

const CheckBoxContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 290px;
  padding: 1rem;
  background-color: ${({ theme }) => theme.colors.bgPrimaryLight};
  box-shadow: inset 0px 0px 0px 1px ${({ theme }) => theme.colors.bgHover};
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 65%;

  margin-bottom: 1rem;
`;

const CheckBoxHeader = styled.legend`
  font-family: ${({ theme }) => theme.fontFamilies.heading};
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 20px;
  letter-spacing: 0.16px;

  color: ${({ theme }) => theme.colors.white};
`;

const CheckBoxWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

`;
