import React from 'react';
import { getSubcategoryPosts } from '../../../../api/posts';
import { PostSummaryDTO } from '../../../../types/dtos';
import {
  Anchor,
  Modal,
  Breadcrumbs,
  Button,
  Title,
  Divider,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import CreatePostForm from '../../../../components/CreatePostForm';
import PostSummaryItemList from '../../../../components/PostSummaryItemList/PostSummaryItemList';
import TopPost from '../../../../components/TopPosts/TopPost';

type Props = {
  subcategoryPosts: PostSummaryDTO[];
};

const numberOfTopPosts = 3;
const postsPerPage = 10;

function SubCategoryPage({ subcategoryPosts }: Props) {
  const [opened, { close, open }] = useDisclosure(false);
  const items = [
    { title: 'Education', href: '#' },
    { title: 'documentaries', href: '#' },
  ].map((item, index) => (
    <Anchor href={item.href} key={index}>
      {item.title}
    </Anchor>
  ));

  return (
    <>
      <Modal
        classNames={{ body: 'md:mx-5' }}
        opened={opened}
        onClose={close}
        centered
        withCloseButton={false}
      >
        <CreatePostForm onDismiss={close} />
      </Modal>
      <div className='flex flex-col  justify-between md:flex-row '>
        <Breadcrumbs
          separator='>'
          styles={{
            breadcrumb: { color: 'grey', fontWeight: '500' },
            separator: { color: 'grey', fontWeight: '500' },
          }}
        >
          {items}
        </Breadcrumbs>
        <Button
          onClick={open}
          fw={'bolder'}
          radius='lg'
          color='dark'
          size='sm'
          className='mt-5 md:mt-0'
        >
          Submit a post
        </Button>
      </div>

      <Title order={2} mt={30}>
        Top 3 posts
      </Title>

      <div className='mt-5 justify-between space-y-4 md:flex md:gap-5 md:space-y-0'>
        {subcategoryPosts &&
          subcategoryPosts
            .slice(0, numberOfTopPosts)
            .map((post) => <TopPost post={post} key={post.id} />)}
      </div>

      <Divider className='my-5' size={'xl'} />

      <PostSummaryItemList posts={subcategoryPosts.slice(numberOfTopPosts)} />
    </>
  );
}

export async function getServerSideProps(context: {
  params: { subcategory: any };
}) {
  const subcategoryName = context.params.subcategory;
  const subcategoryPosts = (
    await getSubcategoryPosts(subcategoryName, 0, postsPerPage)
  ).content;
  console.log(subcategoryPosts);
  return {
    props: {
      subcategoryPosts,
    },
  };
}
export default SubCategoryPage;
