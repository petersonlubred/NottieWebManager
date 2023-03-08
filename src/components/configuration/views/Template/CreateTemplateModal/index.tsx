import { FormGroup, Select, SelectItem, TextInput } from '@carbon/react';
import { Field, Form, Formik } from 'formik';
import { upperCase } from 'lodash';
import React from 'react';
import styled from 'styled-components';

import ErrorMessage from '@/components/shared/ErrorMessage/ErrorMessage';
import Loader from '@/components/shared/Loader';
import Modal from '@/components/shared/Modal';
import { useToast } from '@/context/ToastContext';
import { FormikRefType } from '@/interfaces/formik.type';
import { ILookServiceType } from '@/interfaces/template';
import { useCreateTemplateConfigMutation, useLookupServiceTypeQuery } from '@/redux/api';
import { initialTemplate } from '@/schemas/dto';
import { IinitialTemplate } from '@/schemas/interface';
import { templateSchema } from '@/schemas/schema';
import { px } from '@/utils';
import { pickValues } from '@/utils/helpers/helpers';

type IProps = {
  open?: boolean;
  formRef: React.RefObject<FormikRefType<IinitialTemplate>>;
  formdata?: IinitialTemplate;
  handleSubmit: () => void;
  toggleModal: () => void;
};

const CreateTemplateAlertModal = ({ open, toggleModal, formRef, formdata, handleSubmit }: IProps) => {
  const { data, isFetching } = useLookupServiceTypeQuery({});
  const [createTemplate] = useCreateTemplateConfigMutation();

  const { toast } = useToast();

  const handleFormSubmit = async (values: IinitialTemplate) => {
    const formvalues = values as IinitialTemplate;
    try {
      await createTemplate(pickValues({ ...formvalues, templateCode: upperCase(formvalues.templateName) })).unwrap();
      toast('success', 'Created successfully');
      toggleModal();
    } catch (error: any) {
      toast('error', error?.data?.message || error?.data?.title || 'Something went wrong');
    }
  };

  return (
    <TemplateModalContainer>
      {isFetching && <Loader />}
      <Modal buttonLabel="Create template" heading=" Create template" open={open} toggleModal={toggleModal} secondaryButtonText="Cancel" extent="sm" onRequestSubmit={handleSubmit}>
        <ModalContainer>
          <Formik initialValues={{ ...initialTemplate, ...formdata }} validationSchema={templateSchema} onSubmit={handleFormSubmit} innerRef={formRef}>
            {({ errors, touched, setFieldTouched }) => (
              <Form>
                <FormGroup legendText="">
                  <FormField>
                    <Field name="serviceTypeId">
                      {({ field }: any) => (
                        <Select id="select-1" labelText="Service Type" {...field} onKeyUp={() => setFieldTouched('serviceTypeId', true)}>
                          <SelectItem text="Choose option" />
                          {data?.data.map((serviceType: ILookServiceType) => (
                            <SelectItem key={serviceType.id} text={serviceType.name} value={serviceType.id} />
                          ))}
                        </Select>
                      )}
                    </Field>
                    <ErrorMessage invalid={Boolean(touched.serviceTypeId && errors.serviceTypeId)} invalidText={errors.serviceTypeId} />
                  </FormField>
                  <FormField>
                    <Field name="templateName">
                      {({ field }: any) => (
                        <TextInput
                          {...field}
                          type="text"
                          id="name-input"
                          labelText="Template Name"
                          placeholder="enter name"
                          onKeyUp={() => setFieldTouched('templateName', true)}
                        />
                      )}
                    </Field>
                    <ErrorMessage invalid={Boolean(touched.templateName && errors.templateName)} invalidText={errors.templateName} />
                  </FormField>
                </FormGroup>
              </Form>
            )}
          </Formik>
        </ModalContainer>
      </Modal>
    </TemplateModalContainer>
  );
};

export default CreateTemplateAlertModal;

const TemplateModalContainer = styled.div`
  .cds--modal-container--sm {
    width: 451px !important;
  }
`;

const ModalContainer = styled.div`
  label {
    color: ${({ theme }) => theme.colors.lightText};
  }
`;

const FormField = styled.div`
  margin-bottom: ${px(16)};
`;
