import React from "react";
import { BiFilter } from "react-icons/bi";
import { Button, Select } from "@chakra-ui/react";
import { css } from "@emotion/react";

const MainTemplate: React.FC = ({ children }) => {
  return (
    <main
      className="bg-white"
      css={css` flex: 1 0 auto; `}
    >
      <div className="filter-subnav container-fluid">
        <div
          className="filter-subnav-inner flex items-center flex-row justify-between"
        >
          <div className="filter-views">
            <Select placeholder="선택하기" className="font-semibold">
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </Select>
          </div>
          <div className="fiter-settings">
            <Button
              leftIcon={<BiFilter />}
              colorScheme="gray"
              variant="outline"
            >
              필터 설정
            </Button>
          </div>
        </div>
      </div>
      <div className="wrap-inner">
        {children}
      </div>
    </main>
  );
};

export default MainTemplate;
