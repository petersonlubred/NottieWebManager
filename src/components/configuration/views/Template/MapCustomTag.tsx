import { Link } from '@carbon/icons-react';
import { TextInput } from '@carbon/react';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import Loader from '@/components/shared/Loader';
import Modal from '@/components/shared/Modal';
import { useToast } from '@/context/ToastContext';
import { ITemplateNonTransactionCustomTag } from '@/interfaces/template';
import { useGetNonTransactionTemplateConfigCustomTagsQuery, useUpdateNonTransactionTemplateConfigCustomTagsMutation } from '@/redux/api';
import { px } from '@/utils';

type IProps = {
  open?: boolean;
  toggleModal: () => void;
  templateId: string;
};

const MapCustomTags = ({ open, toggleModal, templateId }: IProps) => {
  const { data, isSuccess } = useGetNonTransactionTemplateConfigCustomTagsQuery({ templateId });
  const [mapCustomTags] = useUpdateNonTransactionTemplateConfigCustomTagsMutation();
  const [customDataArray, setCustomDataArray] = useState<ITemplateNonTransactionCustomTag[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const updateCustomDataArray = ({ tagId, field, value }: { tagId: string; field: string; value: string }) => {
    const copiedDataArray = [...customDataArray];
    const customTagToUpdateIndex = copiedDataArray.findIndex((tag) => tag.tagId === tagId);
    copiedDataArray[customTagToUpdateIndex] = {
      ...copiedDataArray[customTagToUpdateIndex],
      [field]: value,
    };
    setCustomDataArray(copiedDataArray);
  };

  const handleSubmit = async () => {
    setLoading(true);
    const changed = customDataArray
      .filter((tag) => tag.mappedName)
      .map((tag) => {
        return {
          tagId: tag.tagId,
          mappedName: tag.mappedName,
          description: tag.description,
        };
      });
    try {
      await mapCustomTags({
        templateId,
        data: changed,
      }).unwrap();
      toast('success', 'Custom tag added successfully');
      setLoading(false);
      toggleModal();
    } catch (error: any) {
      toast('error', error?.data?.message || error?.data?.title || 'Something went wrong');
      setLoading(false);
    }
  };

  const callHandleSubmit = () => {
    handleSubmit();
  };

  useEffect(() => {
    if (isSuccess) {
      setCustomDataArray(data?.data);
    }
  }, [data?.data, isSuccess]);

  return (
    <InputModalContainer>
      <Modal buttonLabel="Save Changes" heading="Map custom tags" open={open} toggleModal={toggleModal} extent="sm" onRequestSubmit={callHandleSubmit}>
        {loading && <Loader />}
        {customDataArray.map((item: ITemplateNonTransactionCustomTag) => (
          <InputFieldContainer key={item.tagId}>
            <TagBox>{item.tagName}</TagBox>
            <IconBox isMapped={item.isMapped}>
              <Link size={16} />
            </IconBox>
            <InputBox>
              <TextInput
                type="text"
                id={item.tagId}
                value={item.mappedName}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  updateCustomDataArray({ tagId: item.tagId, field: 'mappedName', value: event.target.value });
                }}
              />
            </InputBox>
          </InputFieldContainer>
        ))}
      </Modal>
    </InputModalContainer>
  );
};

export default MapCustomTags;

const InputModalContainer = styled.div`
  .cds--modal-container--sm {
    width: 435px !important;
  }
`;

const InputFieldContainer = styled.div`
  display: flex;
  gap: 1;
  align-items: center;
  margin-bottom: 14px;
`;
const TagBox = styled.div`
  width: 25%;
  margin-right: ${px(10)};
`;

const IconBox = styled.div<{ isMapped: boolean }>`
  width: 25%;
  text-align: center;
  svg {
    fill: ${(props) => (props.isMapped ? ({ theme }) => theme.colors.button : '')}!important;
  }
`;

const InputBox = styled.div`
  width: 256px;
  flex: none;
  order: 1;
  align-self: stretch;
  flex-grow: 0;
`;
