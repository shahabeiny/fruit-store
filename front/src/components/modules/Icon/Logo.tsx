import * as React from "react";
const Logo = ({ className }: { className?: string }) => (
  <svg
    fill="currentColor"
    viewBox="0 0 41 40"
    xmlns="http://www.w3.org/2000/svg"
    className={className || ''}
  >
    <path d="M16.0569 0.00102901C15.8613 0.0126934 15.8027 0.0176935 15.674 0.0343571C15.4845 0.0585203 15.2824 0.0993471 15.1012 0.150173C15.022 0.172669 14.8408 0.233077 14.842 0.236826C14.8429 0.238493 14.8867 0.269738 14.94 0.305983C15.7966 0.89131 16.5075 1.62953 17.0643 2.51065C17.5801 3.32635 17.984 4.26329 18.353 5.50019C18.5023 6.00053 18.6191 6.43713 18.8655 7.41823C19.1456 8.53264 19.2612 8.96383 19.4277 9.51374C19.4834 9.69663 19.6007 10.0578 19.6548 10.2116C19.7635 10.5215 19.9078 10.8923 20.0128 11.1302L20.023 11.1531L20.0275 11.1364C20.03 11.1272 20.0439 11.0718 20.0587 11.0131C20.2415 10.2732 20.2645 9.49458 20.13 8.56389C20.0693 8.14145 19.9984 7.78817 19.8004 6.91414C19.6778 6.37339 19.6511 6.25216 19.5991 5.99345C19.4437 5.22565 19.376 4.60574 19.3863 4.04999C19.3879 3.96042 19.3904 3.87252 19.3916 3.85461L19.3945 3.82128L20.2961 6.97288C20.7918 8.70595 21.1981 10.1249 21.1989 10.1257C21.2002 10.127 25.9764 7.36574 25.9826 7.36032C25.9863 7.35657 25.8243 7.02621 25.7558 6.89748C24.6566 4.83487 22.6098 2.71936 20.4207 1.38332C19.294 0.695506 18.1833 0.249741 17.1681 0.0781002C16.9676 0.0439386 16.7859 0.0226927 16.5633 0.00644493C16.503 0.00227833 16.109 -0.00188732 16.0569 0.00102901Z" />
    <path d="M12.3077 2.06948C11.9386 2.09322 11.5717 2.22154 11.2437 2.44192C10.7783 2.75479 10.3908 3.2593 10.1219 3.90336C10.0218 4.14291 9.89143 4.53618 9.80041 4.87488C9.59991 5.62018 9.46256 6.43839 9.35595 7.52448C9.31823 7.90692 9.29363 8.19979 9.23254 8.99509C9.17186 9.78621 9.13741 10.182 9.09682 10.5678C9.08575 10.6723 9.08124 10.7327 9.08247 10.7498C9.09108 10.839 9.15545 10.9469 9.2883 11.0948C9.3129 11.1223 9.40228 11.216 9.48675 11.3031C9.65198 11.473 9.72497 11.5522 9.79385 11.6338C9.81763 11.6626 9.84141 11.6905 9.84633 11.6963C9.85494 11.7063 9.85535 11.7068 9.85576 11.6988C9.85576 11.6938 9.97467 10.404 10.1202 8.83261C10.2658 7.26077 10.4081 5.72142 10.4368 5.4123C10.465 5.10276 10.4888 4.84947 10.4888 4.84947C10.4892 4.84905 10.5639 4.86072 10.6553 4.8753C10.7467 4.88988 10.8218 4.90196 10.8222 4.90196C10.823 4.90196 10.8238 6.35632 10.8242 8.13355L10.8254 11.3656L11.8136 11.6247C16.4259 12.8357 17.6592 13.1594 17.6604 13.1582C17.6608 13.1574 17.6403 13.052 17.6153 12.9237C17.5899 12.7953 17.5366 12.5133 17.4964 12.2967C17.334 11.4147 17.2844 11.161 17.2008 10.7931C17.1262 10.4649 17.0716 10.2557 16.9654 9.89495C16.8441 9.48168 16.7846 9.27129 16.5124 8.28478C16.1151 6.84541 15.8797 6.09178 15.5857 5.32065C15.343 4.68283 15.0347 4.01876 14.8055 3.63965C14.5714 3.25263 14.2848 2.9131 13.9797 2.66189C13.4664 2.23903 12.8845 2.03282 12.3077 2.06948Z" />
    <path d="M32.5251 8.19719C31.3365 8.23593 30.0941 8.43799 28.8083 8.80126C26.1625 9.54907 23.6544 10.8889 21.9081 12.4878C21.7072 12.6715 21.3747 13.0035 21.2156 13.1789C20.7806 13.6584 20.4489 14.1021 20.1619 14.5879C20.1447 14.6166 20.1315 14.6404 20.1324 14.6412C20.1328 14.642 20.1574 14.6404 20.1861 14.6379C20.6736 14.5954 21.1357 14.4437 21.6802 14.1471C22.1849 13.8726 22.8778 13.4789 24.007 12.8244C24.9312 12.2891 25.2276 12.1183 25.604 11.9041C27.2474 10.9693 28.468 10.3423 29.6283 9.83652C30.4352 9.48491 31.1897 9.30285 32.0556 9.25119C32.2619 9.2387 32.6329 9.24161 32.8675 9.25786C33.7814 9.31993 34.6846 9.56073 35.5777 9.98025C35.6273 10.0036 35.6691 10.024 35.6707 10.0252C35.6724 10.0269 35.51 10.0273 35.3099 10.0269C34.1139 10.0223 33.006 10.0886 31.8793 10.2327C28.32 10.6872 25.2699 11.8904 23.1562 13.673C22.8934 13.8947 22.7015 14.0717 22.46 14.315C22.23 14.5462 22.0627 14.7295 21.8667 14.9649C21.772 15.0786 21.5428 15.3728 21.5145 15.4173L21.508 15.4282L21.5559 15.4652C21.6322 15.5236 21.804 15.6644 21.9139 15.7581C22.2079 16.0081 22.4506 16.2301 23.0312 16.7792C23.7553 17.4641 24.0595 17.7366 24.4314 18.0336C25.2166 18.6606 25.8808 18.9864 26.5163 19.0555C26.6738 19.0726 26.9517 19.0751 27.1149 19.0605C27.807 18.9985 28.5561 18.7468 29.493 18.2627C29.8784 18.0636 30.2462 17.8557 30.8666 17.4874C31.0043 17.4058 31.2208 17.2771 31.3483 17.2012C31.915 16.8646 32.1491 16.7317 32.6173 16.4813C33.9782 15.7531 34.7117 15.3165 35.4046 14.822C35.8897 14.4754 36.2673 14.1638 36.6535 13.7905C37.1952 13.2668 37.5498 12.7352 37.7364 12.1674C37.8073 11.952 37.845 11.775 37.8676 11.5467C37.875 11.4759 37.8774 11.2576 37.8721 11.178C37.85 10.851 37.7725 10.5589 37.6298 10.2656C37.4527 9.9011 37.1915 9.57906 36.8426 9.29494C36.1808 8.75585 35.2689 8.41424 34.0967 8.26635C33.856 8.23593 33.6215 8.21635 33.3062 8.20094C33.1926 8.19552 32.6579 8.19302 32.5251 8.19719Z" />
    <path d="M40.4392 12.7135C40.3539 12.9144 40.285 13.0668 40.203 13.2368C39.5638 14.5612 38.6827 15.6723 37.5252 16.6134C36.6568 17.3195 35.6469 17.9344 34.2783 18.5902C33.7473 18.8447 33.3295 19.0326 32.1483 19.5475C30.8297 20.1224 30.3155 20.359 29.6513 20.6961C29.0912 20.9802 28.641 21.2331 28.1937 21.5139C28.1395 21.5476 28.0944 21.5759 28.094 21.5768C28.0932 21.5772 28.1059 21.5943 28.1227 21.6147C28.1621 21.6626 28.2318 21.7543 28.3355 21.893C28.4905 22.1013 28.5516 22.1671 28.5828 22.1604C28.5951 22.1579 29.0994 21.9542 30.1474 21.528C31.8715 20.8273 33.1253 20.312 36.2751 19.0093C36.9541 18.7285 37.5113 18.4981 37.5133 18.4972C37.517 18.4956 37.6298 18.6922 37.6335 18.706C37.6343 18.7101 36.7433 19.1671 31.1712 22.0205C30.1568 22.54 29.3261 22.9657 29.3249 22.9666C29.3241 22.9678 29.6628 23.8552 30.0773 24.9388C30.4918 26.0223 31.0384 27.4505 31.2913 28.1129C31.5447 28.7748 31.7534 29.3185 31.7551 29.3206C31.7596 29.326 31.8116 29.3014 32.0335 29.1894C32.5345 28.9365 32.974 28.6782 33.4624 28.3503C35.2135 27.1751 36.8577 25.5112 38.1734 23.5823C39.8275 21.1573 40.8353 18.496 40.9821 16.1668C40.9948 15.9656 40.9968 15.8989 40.9993 15.6564C41.0026 15.3077 40.9927 15.0624 40.9632 14.7545C40.8992 14.0896 40.7533 13.4626 40.5298 12.8923C40.4933 12.7998 40.4523 12.7006 40.449 12.6969C40.4478 12.6961 40.4437 12.7036 40.4392 12.7135Z" />
    <path d="M8.4373 13.6302C8.0855 13.641 7.72961 13.6685 7.39135 13.711C5.44582 13.9568 3.7463 14.738 2.2682 16.0653C2.07713 16.2369 1.83891 16.4669 1.68762 16.626L1.59741 16.721H1.63554C1.73149 16.721 2.14724 16.7335 2.39366 16.7439C3.99436 16.8118 4.97635 17.0147 5.9936 17.488C6.11743 17.5455 6.39378 17.6863 6.52047 17.7567C6.97682 18.0095 7.44998 18.3124 8.05188 18.7369C9.83586 19.9955 10.7457 20.7141 11.6293 21.5636C11.783 21.7115 12.455 22.3985 12.9905 22.9555C13.5592 23.547 14.0152 24.0278 14.9996 25.0739C15.0697 25.1485 15.4248 25.5271 15.7889 25.9154C17.6356 27.8855 18.3314 28.6192 19.2765 29.5919C20.1006 30.4397 21.2392 31.5758 21.632 31.942C22.6255 32.8677 23.9023 33.6563 25.2254 34.1612C25.6227 34.3129 26.0536 34.4475 26.307 34.4995C26.7092 34.5816 27.0885 34.5874 27.4415 34.5179C28.0996 34.3875 28.6334 33.9967 28.9709 33.3972C29.1652 33.0518 29.2927 32.6269 29.3374 32.1749C29.3534 32.0132 29.3543 31.992 29.3538 31.6333C29.3538 31.2171 29.3456 30.9263 29.3235 30.5147C29.2382 28.9512 28.9807 27.7001 28.5383 26.6966C28.4141 26.4149 28.0943 25.7842 27.8339 25.3072C26.5087 22.8801 24.8884 20.8129 22.9867 19.1248C21.3815 17.6996 19.5795 16.5431 17.5806 15.6557C15.574 14.7646 13.3714 14.1464 10.9814 13.8031C10.2291 13.6948 9.71901 13.6477 9.11587 13.6298C8.9572 13.6252 8.59843 13.6252 8.4373 13.6302ZM10.4382 15.0921C10.9101 15.1083 11.3611 15.1496 11.8343 15.2196C13.8466 15.5174 16.0123 16.3106 18.1608 17.5367C21.0318 19.1752 23.6784 21.4915 25.5046 23.9636C26.7236 25.6138 27.5297 27.2656 27.8634 28.7983C28.0643 29.7207 28.0926 30.5972 27.9479 31.4004C27.929 31.5041 27.902 31.6354 27.8987 31.6391C27.8975 31.64 27.8966 31.6337 27.8966 31.6245C27.8966 31.5737 27.8798 31.3108 27.8675 31.175C27.7589 29.9465 27.4091 28.675 26.8265 27.3902C25.553 24.5815 23.2262 21.844 20.2663 19.6722C19.0588 18.7861 17.7492 18.0012 16.4154 17.3642C13.9245 16.1748 11.3488 15.4799 8.82886 15.317C8.60499 15.3029 8.27575 15.2879 8.17899 15.2879C8.14905 15.2879 8.12978 15.2862 8.13183 15.2841C8.13675 15.2795 8.3188 15.2446 8.46641 15.2191C8.86658 15.1512 9.30448 15.1075 9.7309 15.0925C9.86907 15.0875 10.3029 15.0875 10.4382 15.0921Z" />
    <path d="M2.23171 19.8562C1.47605 19.8971 0.892187 20.187 0.504722 20.7149C0.421079 20.829 0.356296 20.9382 0.289874 21.0765C0.131608 21.4085 0.0418141 21.7772 0.0073728 22.2388C-7.48572e-06 22.3334 -0.00246758 22.6391 0.00286262 22.7512C0.0717453 24.2039 0.370647 25.6129 0.851595 26.7493C0.962299 27.0114 1.16854 27.4351 1.39856 27.8733C2.33708 29.6622 3.44699 31.267 4.72624 32.6851C5.0805 33.078 5.54136 33.5491 5.9239 33.9103C7.55043 35.4447 9.40944 36.7128 11.4899 37.7081C13.2004 38.5263 15.055 39.16 17.0677 39.6136C17.8504 39.7899 18.5942 39.9053 19.3109 39.9611C19.7131 39.9923 20.0231 40.0027 20.4303 39.9994C20.7029 39.9969 20.7878 39.9944 21.0063 39.9819C22.2925 39.9082 23.4968 39.6207 24.6247 39.1187C24.9158 38.9891 25.2586 38.8146 25.5411 38.6517C25.9884 38.3947 26.4718 38.0668 26.8581 37.7585L26.8917 37.7314L26.69 37.7289C26.3037 37.7239 25.9868 37.6998 25.6334 37.6485C23.9982 37.4123 22.484 36.6632 20.9694 35.3414C20.6045 35.0227 20.2724 34.7031 19.8202 34.2349C19.3548 33.7533 19.0137 33.3842 18.1608 32.4393C16.9874 31.1395 16.6343 30.7646 15.8524 29.988C13.9676 28.1162 13.5096 27.6625 12.8532 27.0172C10.8014 24.9992 9.19747 23.4865 7.67877 22.1384C7.38848 21.8805 7.25727 21.7655 7.18265 21.7035C6.61683 21.2319 5.90914 20.8278 5.06697 20.4945C4.61349 20.3149 4.07719 20.1458 3.58066 20.025C3.17515 19.9266 2.95785 19.8879 2.67043 19.8641C2.59662 19.8579 2.30059 19.8525 2.23171 19.8562ZM2.25631 21.0431C2.47649 21.1127 2.71676 21.1769 3.17269 21.2889C3.80043 21.4427 4.10507 21.5306 4.39864 21.6418C4.75167 21.7759 4.99808 21.9093 5.26582 22.1109C8.03015 24.1939 9.97527 25.8187 11.6067 27.4084C12.2152 28.0017 13.1799 28.9907 14.0303 29.8939C15.0894 31.0187 15.9394 31.9502 17.9927 34.2349C19.1928 35.5701 19.7779 36.2175 20.336 36.8274C20.4339 36.9349 20.5147 37.024 20.5155 37.0257C20.5164 37.0282 20.3458 37.1998 20.1264 37.4169L20.083 37.4598L19.8005 37.1523C19.2572 36.5616 18.8685 36.1358 17.8246 34.991C15.866 32.843 15.0062 31.9086 14.0156 30.8521C12.7867 29.5414 11.5485 28.2616 10.6145 27.3355C9.27332 26.0061 8.106 24.9521 6.96739 24.0427C6.73286 23.8552 6.51432 23.6952 6.23141 23.5036C5.76686 23.1891 5.37735 22.9528 4.38429 22.3846C3.53351 21.8976 3.14809 21.6676 2.71963 21.391C2.55111 21.2819 2.18579 21.0348 2.17021 21.0194C2.16529 21.0144 2.15955 21.0127 2.25631 21.0431Z" />
  </svg>
);
export default Logo;
