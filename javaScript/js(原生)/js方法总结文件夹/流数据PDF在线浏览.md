## 流数据在线浏览


./index.tsx
```tsx
// ... 获取流数据
let streamData = res;

 const blob = new Blob([res.data], { type: 'application/pdf' });
		const reader = new FileReader();
		reader.readAsDataURL(blob);

		reader.onload = e => {
			if (e.target.result) { 
				localStorage.setItem("pdfCtt", e.target.result);
				window.open(`${window.location.origin}/pdf`, '_blank');
				//     const a = document.createElement('a');
				//     a.href = `/institute_gjzy/pdf?path=`;
				//     a.target = "_blank";
				//     document.body.appendChild(a);
				//     a.click();
				//     document.body.removeChild(a);
				
			}

		};

```

./pdf.tsx
```tsx
import * as React from 'react';
import PDFViewer from './PDFViewer';
import { useHistory,useSelector } from 'umi';
const PDF = () => {
  let reportCtt = localStorage.getItem("pdfCtt");
  return (
    <div>
      <PDFViewer file={reportCtt} />
    </div>
  );
};

export default PDF;

```

./PDFViewer.tsx
```tsx
import React, { FC, useState } from 'react';
import { Document, Page } from 'react-pdf';
import PdfPagination from './paginationBar';
import styles from './index.less';

export interface PdfViewerProps {
  file: string | Record<string, unknown>;
}

const PDFViewer: FC<PdfViewerProps> = ({ file }) => {
  const [pageCount, setPageCount] = useState<number>(0);
  const [currentPage, setPageNumber] = useState(1);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setPageCount(numPages);
  };

  const nextPage = () => {
    if (pageCount && currentPage < pageCount) {
      setPageNumber(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (pageCount && currentPage > 1) {
      setPageNumber(currentPage - 1);
    }
  };

  return (
    <div className={styles.pdfViewer}>
      <div className={`${styles.pagination} ${styles.paginationTop}`}>
        <PdfPagination
          pageCount={pageCount}
          currentPage={currentPage}
          nextPage={nextPage}
          prevPage={prevPage}
        />
      </div>
      <Document
        className={styles.document}
        options={{
          cMapUrl: '/cmaps/',
          cMapPacked: true
        }}
        file={file}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Page renderTextLayer={false} pageNumber={currentPage} />
      </Document>
      <div className={`${styles.pagination} ${styles.paginationBottom}`}>
        <PdfPagination
          pageCount={pageCount}
          currentPage={currentPage}
          nextPage={nextPage}
          prevPage={prevPage}
        />
      </div>
    </div>
  );
};

export default PDFViewer;


```

./paginationBar.tsx
```tsx
import React, { FC } from 'react';
import { Button } from 'antd';
import styles from './index.less';

export interface PdfPaginationProps {
  pageCount: number;
  currentPage: number;
  nextPage: () => void;
  prevPage: () => void;
}

const PdfPagination: FC<PdfPaginationProps> = ({ pageCount, currentPage, nextPage, prevPage }) => (
  <div className={styles.pagination}>
    <Button type="link" onClick={prevPage}>
      上一页
    </Button>
    <p>{`${currentPage}  / ${pageCount}`}</p>
    <Button type="link" onClick={nextPage}>
      下一页
    </Button>
  </div>
);

export default PdfPagination;

```