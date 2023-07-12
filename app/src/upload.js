import React, {useEffect, useRef, useState} from 'react';
import styled from 'styled-components';
import { Player } from '@lottiefiles/react-lottie-player';
import {CiFileOn} from "react-icons/ci"
import {BsFillTrashFill} from "react-icons/bs";
import {AiOutlinePlusCircle} from "react-icons/ai"

import { Line } from 'rc-progress';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f9f9fa;

  @media (max-width: 1023px) {
    width: 100%;
    height: 100%;
  }
`;

const Card = styled.div`
  display: flex;
  width: 70%;
  height: 70%;
  padding: 40px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 12px 18px 2px rgba(34, 0, 51, 0.04),
  0 6px 22px 4px rgba(7, 48, 114, 0.12),
  0 6px 10px -4px rgba(14, 13, 26, 0.12);

  @media (max-width: 1023px) {
    width: 100%;
    height: 100vh;
    border-radius: 0px;
    flex-direction: column;
  }
`;

const UploadSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-style: dashed;
  border-color: rgba(128, 128, 128, 0.40);
  border-radius: 6px;
  width: 50%;
  flex: 1;

  @media (max-width: 1023px) {
    flex-direction: column;
    width: 100%;
  }
  
`;
const DescriptionSection = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 50%;

  @media (max-width: 1023px) {
    margin-top: 50px;
    flex-direction: column;
    width: 100%;
  }
`;
const UploadTitle = styled.div`
  font-size: 22px;
  margin-bottom: 5px;
  font-weight: bolder;
  text-align: center;
`;
const Subtitle = styled.div`
  font-size: 16px;
  font-weight: lighter;
  text-align: center;
  margin-bottom: 2rem;
`;
const UploadButton = styled.button`
  width: 50%;
  padding: 12px;
  font-size: 16px;
  font-weight: bold;
  background-color: #0060df;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  //margin-top: 2rem;

  &:hover {
    background-color: #0060bf;
  }
`;
const Caption = styled.div`
  margin-top: 1rem;
  width: 40%;
  font-size: 13px;
  text-align: center;
  opacity: 0.4;
`;
const DescriptionTitle = styled.div`
  font-size: 33px;
  margin-bottom: 5px;
  font-weight: bold;
  text-align: center;
`;
const UploadedFilesSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-color: rgba(128, 128, 128, 0.40);
  border-radius: 6px;
  width: 50%;
  flex: 1;

  @media (max-width: 1023px) {
    flex-direction: column;
    width: 100%;
  }
`;
const UploadedFilesList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 50%;
  background-color: #F9F9Fa;
  border-radius: 5px;
  padding-top: 20px;
  padding-bottom: 20px;
`;
const UploadedFileCell = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 95%;
  height: 70px;
  border-radius: 10px;
  background-color: white;
  margin: 5px;
  box-shadow: 0 12px 18px 2px rgba(34, 0, 51, 0.04),
  0 6px 22px 4px rgba(7, 48, 114, 0.08),
  0 6px 10px -4px rgba(14, 13, 26, 0.08);
`;
const UploadedFileCellContents = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
const UploadedFileCellAttributions = styled.div`
      display: flex;
      flex-direction: column;
      align-content: center;
`;
const FileNameAttribute = styled.h4`
    margin: 0px;
    margin-bottom: 7px;
    font-weight: bold;
`;
const FileSize = styled.p`
    margin: 0px;
    opacity: 0.50;
`;
const UploadedListActions = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: row;
  margin-top: 20px;
  justify-content: space-between;
  align-items: center;
  align-content: center;
`;
const AddAnotherFileButton = styled.button`
  display: flex;
  align-items: center;
  border: none;
  background: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  font-weight: bold;
  font-size: larger;
`;

const StatusSection = styled.div`
  width: 100%;
  display: flex;
  margin: 0;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-content: center;
`;

const StatusSectionTitle = styled.h1`
  margin: 0;
  margin-bottom: 10px;
  text-align: center;
`

const StatusSectionDescription = styled.p`
  margin: 0;
`


export function Upload() {
    const inputFile = useRef(null);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [totalFileSize, setTotalFileSize] = useState(0);
    const [isUploading, setIsUploading] = useState(false);
    const [isUploaded, setIsUploaded] = useState(false);

    const handleAddFileClickClick = () => {
        inputFile.current.click();
    };

    const handleUploadClick = () => {
        setIsUploading(true);
    }

    const handleFileDelete = (fileToRemove) =>{
        setSelectedFiles(prevFiles => prevFiles.filter(file => file !== fileToRemove));
        setTotalFileSize(prevFileSize => prevFileSize-fileToRemove.size)
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setTotalFileSize(prevFileSize => prevFileSize+file.size)
        setSelectedFiles((prevFiles) => [...prevFiles, file]);
    };

    // useEffect(() => {
    //     console.log(selectedFiles);
    // }, [selectedFiles]);

    if(!isUploading) {
        return (
            <Wrapper>
                <Card>
                    {selectedFiles.length === 0 ? (
                        <UploadSection>
                            <Player
                                src='/upload.json'
                                className="player"
                                loop
                                autoplay
                                style={{height: '150px', width: 'auto'}}
                            />
                            <UploadTitle>Drag and drop files</UploadTitle>
                            <Subtitle>or click to send up to 1GB</Subtitle>
                            <UploadButton onClick={handleAddFileClickClick}>Select files to upload</UploadButton>
                            <input
                                type="file"
                                ref={inputFile}
                                style={{display: 'none'}}
                                onChange={handleFileChange}
                            />
                            <Caption>Make sure you trust your recipient when sending sensitive data</Caption>
                        </UploadSection>
                    ) : (
                        <UploadedFilesSection>
                            <UploadedFilesList>
                                {selectedFiles.map((file, index) => (
                                    <UploadedFileCell>
                                        <CiFileOn size={30} style={{padding: '10px'}}/>
                                        <UploadedFileCellContents>
                                            <UploadedFileCellAttributions>
                                                <FileNameAttribute>{file.name}</FileNameAttribute>
                                                <FileSize>{formatBytes(file.size)}</FileSize>
                                            </UploadedFileCellAttributions>
                                            <BsFillTrashFill size={30} onClick={() => handleFileDelete(file)}
                                                             style={{marginRight: '20px', cursor: "pointer"}}/>
                                        </UploadedFileCellContents>
                                    </UploadedFileCell>
                                ))}
                            </UploadedFilesList>
                            <UploadedListActions>
                                <AddAnotherFileButton onClick={handleAddFileClickClick}>{<AiOutlinePlusCircle
                                    style={{marginRight: '10px'}} size={30}/>}Add another file</AddAnotherFileButton>
                                <input
                                    type="file"
                                    ref={inputFile}
                                    style={{display: 'none'}}
                                    onChange={handleFileChange}
                                />
                                <FileSize>Total upload size: {formatBytes(totalFileSize)}</FileSize>
                            </UploadedListActions>
                            <UploadButton style={{marginTop: '20px', width: '100%'}} onClick={handleUploadClick}>Upload
                                and get link</UploadButton>
                        </UploadedFilesSection>
                    )}
                    <DescriptionSection>
                        <DescriptionTitle>Simple, private file sharing</DescriptionTitle>
                        <Subtitle>Upsend lets you share files with end-to-end encryption with a link that optionally
                            automatically expires.</Subtitle>
                    </DescriptionSection>
                </Card>
            </Wrapper>
        );
    }else{
        return(
            <Wrapper>
                <Card>
                    {isUploaded ?
                        <StatusSection>
                            <StatusSectionTitle>Two seconds...</StatusSectionTitle>
                            <StatusSectionDescription>We're encrypting and uploading your file{selectedFiles.length>1 ? 's' : ""}</StatusSectionDescription>
                            <Line percent={44} strokeWidth={3} trailWidth={3} strokeColor="#000000" style={{width:"30%", marginTop:"20px"}}/>
                        </StatusSection>
                        :
                        <StatusSection>
                            {/*<Player*/}
                            {/*    src='/uploaded.json'*/}
                            {/*    className="player"*/}
                            {/*    autoplay*/}
                            {/*    style={{height: '150px', width: 'auto'}}*/}
                            {/*/>*/}
                            <StatusSectionTitle>Your file is encrypted  <br/> and ready to send</StatusSectionTitle>
                            <StatusSectionDescription>Copy the link to share your file{selectedFiles.length>1 ? 's' : ""}</StatusSectionDescription>
                            <LinkBox/>
                            <UploadButton style={{marginTop: '20px', width: "40%"}} onClick={handleUploadClick}>Copy link</UploadButton>
                            <OKButton>OK</OKButton>
                        </StatusSection>
                    }
                </Card>
            </Wrapper>
        );
    }
}

const LinkBox = styled.input`
    width: 40%;
    height: 40px;
    border-radius: 10px;
    border-width: 1px;
    margin-top: 20px;
    font-size: 1rem;
    padding: 5px;
`

const OKButton = styled.h3`
  color: #0060df;
`




function formatBytes(bytes)
{
    if (bytes === 0)
    {
        return '0 B';
    }
    const sizes = ['B', 'KiB', 'MB', 'GB', 'TB', 'PB']
    const i = Math.floor(Math.log2(bytes) / 10);
    const formattedValue = (bytes / Math.pow(1024, i)).toFixed(2);
    return `${formattedValue} ${sizes[i]}`
}

