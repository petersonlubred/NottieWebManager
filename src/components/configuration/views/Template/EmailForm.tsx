import { FormGroup, TextArea, TextInput } from '@carbon/react';
import { Field, Form, Formik } from 'formik';
import styled from 'styled-components';

import ErrorMessage from '@/components/shared/ErrorMessage/ErrorMessage';
import RichTextExample from '@/components/shared/RichText';
import { useToast } from '@/context/ToastContext';
import { FormikRefType } from '@/interfaces/formik.type';
import { ITemplateConfigEmail } from '@/interfaces/template';
import { useUpdateTemplateConfigEmailMutation } from '@/redux/api';
import { initialEmailTemplate } from '@/schemas/dto';
import { IinitialEmailTemplate } from '@/schemas/interface';
import { smsTemplateSchema } from '@/schemas/schema';
import { px } from '@/utils';
import { pickValues } from '@/utils/helpers/helpers';

interface Iprops {
  formRef: React.RefObject<FormikRefType<IinitialEmailTemplate>>;
  formdata?: ITemplateConfigEmail & { templateId: string; serviceTypeId: string };
}

const EmailForm = ({ formdata, formRef }: Iprops) => {
  const [editTemplateSms] = useUpdateTemplateConfigEmailMutation();
  const { toast } = useToast();

  const handleSubmit = async (values: IinitialEmailTemplate) => {
    const formvalues = values as IinitialEmailTemplate;
    try {
      await editTemplateSms(pickValues(formvalues)).unwrap();
      toast('success', 'Saved successfully');
    } catch (error: any) {
      toast('error', error?.data?.message || error?.data?.title || 'Something went wrong');
    }
  };

  return (
    <Formik initialValues={{ ...initialEmailTemplate, ...formdata }} validationSchema={smsTemplateSchema} onSubmit={handleSubmit} innerRef={formRef}>
      {({ errors, touched }) => (
        <Form>
          <FormGroup legendText="">
            <FormField>
              <FormContainer>
                <Field name="subject">{({ field }: any) => <TextInput {...field} type="text" id="templatename-input" labelText="Template Name" placeholder="input name" />}</Field>
              </FormContainer>
              <ErrorMessage invalid={Boolean(touched.subject && errors.subject)} invalidText={errors.subject} />
            </FormField>
            <FormField>
              <FormContainer>
                <Field name="emailBodyContainer">
                  {({ field }: any) => <TextArea {...field} enableCounter id="text-area-1" labelText="Email container" maxCount={500} placeholder="input text" />}
                </Field>
              </FormContainer>
              <ErrorMessage invalid={Boolean(touched.emailBodyContainer && errors.emailBodyContainer)} invalidText={errors.emailBodyContainer} />
            </FormField>
            <FormField>
              <FormContainer>
                <Field name="emailBodyContent">{() => <RichTextExample />}</Field>
              </FormContainer>
              <ErrorMessage invalid={Boolean(touched.emailBodyContent && errors.emailBodyContent)} invalidText={errors.emailBodyContent} />
            </FormField>
          </FormGroup>
        </Form>
      )}
    </Formik>
  );
};

export default EmailForm;

const FormContainer = styled.div`
  width: 100%;
  padding-left: ${px(16)};
  padding-right: ${px(33)};

  label {
    color: ${({ theme }) => theme.colors.lightText};
  }
  input,
  textarea {
    border-bottom: 1px solid ${({ theme }) => theme.colors.bgHover} !important;
  }
  textarea {
    min-height: ${px(300)};
  }

  .editor {
    color: ${({ theme }) => theme.colors.white} !important;
    background-color: ${({ theme }) => theme.colors.bgPrimaryLight} !important;
    min-height: ${px(300)} !important;
    padding: ${px(11)} ${px(16)};
    border-bottom: 1px solid ${({ theme }) => theme.colors.bgHover} !important;
    margin-bottom: ${px(50)};
  }
`;

const FormField = styled.div`
  margin-bottom: ${px(16)};
`;
