import { Close, Copy, Hashtag, Link, Search } from '@carbon/icons-react';
import { TextInput, Tooltip } from '@carbon/react';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import Button from '@/components/shared/Button';
import { useToast } from '@/context/ToastContext';
import { ITemplateConfigTags } from '@/interfaces/template';
import { useGetNonTransactionTemplateConfigTagsQuery, useGetTemplateConfigTagsQuery } from '@/redux/api';
import { px } from '@/utils';

import MapCustomTags from './MapCustomTag';

const TagSection = ({ getNonTransactionalTag, templateId }: { getNonTransactionalTag: boolean; templateId: string }) => {
  const { data: templateTags, isSuccess: templateTagSuccess } = useGetTemplateConfigTagsQuery({}, { skip: getNonTransactionalTag });
  const { data: nonTransactionalTemplateTags, isSuccess: nonTransactionalTemplateSuccess } = useGetNonTransactionTemplateConfigTagsQuery(
    { templateId },
    { skip: !getNonTransactionalTag }
  );
  const [filteredData, setFilteredData] = useState<ITemplateConfigTags[]>([]);
  const [unfilteredData, setUnFilteredData] = useState<ITemplateConfigTags[]>([]);
  const [search, setSearch] = useState(false);
  const [searchFilter, setSearchFilter] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const { toast } = useToast();

  const onToggleModal = () => {
    setOpenModal(false);
  };

  useEffect(() => {
    if (templateTagSuccess || nonTransactionalTemplateSuccess) {
      setFilteredData(getNonTransactionalTag ? nonTransactionalTemplateTags?.data : templateTags?.data);
      setUnFilteredData(getNonTransactionalTag ? nonTransactionalTemplateTags?.data : templateTags?.data);
    }
  }, [templateTags, nonTransactionalTemplateTags, templateTagSuccess, nonTransactionalTemplateSuccess, getNonTransactionalTag]);

  useEffect(() => {
    if (searchFilter !== '') {
      setFilteredData(unfilteredData.filter((tag: ITemplateConfigTags) => tag.tagName.toLowerCase().includes(searchFilter.toLowerCase())));
    }
  }, [searchFilter, unfilteredData]);

  const handleCopy = ({ id }: { id: string }) => {
    navigator.clipboard.writeText(`[${id}]`);
    toast('info', 'Tag ID copied to clipboard');
  };

  return (
    <Container>
      <TagHeader>
        {!search ? (
          <>
            {' '}
            <TagParagraph>
              <Hashtag />
              Tags
            </TagParagraph>
            <Search size={16} onClick={() => setSearch(true)} />
          </>
        ) : (
          <>
            <TextInput
              type="text"
              labelText=""
              placeholder="type here"
              value={searchFilter}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setSearchFilter(event.target.value);
              }}
            />
            <Close
              size={20}
              onClick={() => {
                setSearch(false);
                setSearchFilter('');
                setFilteredData(unfilteredData);
              }}
            />
          </>
        )}
      </TagHeader>
      {getNonTransactionalTag && (
        <ButtonContainer>
          <Button renderIcon={Link} handleClick={() => setOpenModal(true)} buttonLabel="Map Custom Tags" />
        </ButtonContainer>
      )}

      {filteredData.map((tag: ITemplateConfigTags) => (
        <TagContent key={tag.tagId}>
          <Tooltip align="bottom" label={tag.tagName}>
            <button className="tooltip-trigger" type="button" onClick={() => handleCopy({ id: tag.tagId })}>
              <TagContentParagraph>
                {tag.description} <Copy size={16} />
              </TagContentParagraph>
            </button>
          </Tooltip>
        </TagContent>
      ))}

      <MapCustomTags open={openModal} toggleModal={onToggleModal} templateId={templateId} />
    </Container>
  );
};

export default TagSection;

const Container = styled.div`
  width: 22% !important;
  color: ${({ theme }) => theme.colors.white};
  min-height: calc(100vh - 200px);
  max-height: calc(100vh - 200px);
  overflow-y: scroll;
  overflow-x: hidden;
  background-color: ${({ theme }) => theme.colors.tagBackground};
  border-left: 1px solid ${({ theme }) => theme.colors.borderLight};
  &::-webkit-scrollbar {
    display: none;
  }
`;

const TagHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${px(16)};
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderLight};
  button {
    padding: calc(0.875rem - 4px) 33px calc(0.875rem - 3px) 15px !important;
  }
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: ${px(10)};
  button {
    background-color: ${({ theme }) => theme.colors.bgHover};
    color: ${({ theme }) => theme.colors.white} !important;
  }
`;

const TagParagraph = styled.p`
  font-size: ${px(12)};
  font-weight: 400;
  line-height: ${px(28)};
  display: flex;
  align-items: center;

  svg {
    fill: ${({ theme }) => theme.colors.bgHover};
    margin-right: ${px(8)};
  }
`;

const TagContent = styled.div`
  margin: 0 ${px(16)};
  padding: ${px(16)} 0;
  &:not(:last-child) {
    border-bottom: 1px solid ${({ theme }) => theme.colors.borderLight};
  }
  button {
    color: ${({ theme }) => theme.colors.white} !important;
    text-align: left;
  }
`;

const TagContentParagraph = styled.p`
  font-size: ${px(16)};
  font-weight: 400;
`;
