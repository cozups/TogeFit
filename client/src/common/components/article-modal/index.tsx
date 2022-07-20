import { PostResponse } from 'types/interfaces';
import { MutableRefObject, useRef } from 'react';
import { nanoid } from 'nanoid';

import * as SC from './style';
import ImageCarousel from './components/ImageCarousel';
import RoutineList from './components/RoutineList';
import MealList from './components/MealList';

interface ArticleProps {
  post: PostResponse | undefined;
  modalState: React.Dispatch<React.SetStateAction<boolean>>;
}

type ClickEvent =
  | React.MouseEvent<HTMLDivElement, MouseEvent>
  | React.MouseEvent<SVGSVGElement, MouseEvent>;

const ArticleModal = ({ post, modalState }: ArticleProps) => {
  const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>;

  const handleClose = (e: ClickEvent) => {
    if (wrapperRef.current === e.target || e.target instanceof SVGSVGElement) {
      modalState(false);
    }
  };

  return (
    <SC.Wrapper onClick={handleClose} ref={wrapperRef}>
      {!post ? (
        <SC.Modal>게시글이 존재하지 않습니다!</SC.Modal>
      ) : (
        <SC.Modal>
          <SC.CloseIcon onClick={handleClose} />
          <SC.CarouselContainer>
            <ImageCarousel imgUrl={post.post_image} />
          </SC.CarouselContainer>
          <SC.Article>
            <SC.ArticleContent>{post.contents}</SC.ArticleContent>
            <SC.TagContainer>
              {post.tag_list.map((tagObject) => (
                <SC.Tag key={nanoid()}>{`#${tagObject.tag}`}</SC.Tag>
              ))}
            </SC.TagContainer>
            <SC.DivideLine />
            {post.meal_info.length !== 0 && (
              <>
                <MealList mealList={post.meal_info} />
                <SC.DivideLine />
              </>
            )}
            {post.routine_info.length !== 0 && (
              <>
                <RoutineList routineList={post.routine_info} />
                <SC.DivideLine />
              </>
            )}
            {/* 아래 댓글 연결 필요 */}
            <SC.CommentContainer>
              <h3>Comments</h3>
              <li>안녕하세요!</li>
              <li>안녕하세요!</li>
              <li>안녕하세요!</li>
              <SC.CommentInput placeholder="댓글을 입력하세요." type="text" />
              <SC.SubmitButton type="submit">입력</SC.SubmitButton>
            </SC.CommentContainer>
          </SC.Article>
        </SC.Modal>
      )}
    </SC.Wrapper>
  );
};

export default ArticleModal;
